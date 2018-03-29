import * as React from 'react';
import CanvasComponent from '../CanvasComponent';
import { ICanvasComponent, ICanvasProps, ICanvasState, ICanvasCommand } from '../inedx';
import { Set } from 'immutable';
import { IComponent } from '../../BaseComponent';
import { CanvasStyle, ContainerStyle } from '../model/CanvasStyle';
import { CanvasCommand } from '../model/CanvasCommand';
import { DragType } from '../model/types';
import util from '../../util';

/* tslint:disable:no-console */
/* tslint:disable:jsx-no-string-ref */
export default class Canvas extends CanvasComponent<ICanvasProps, ICanvasState> implements ICanvasComponent {
    container: HTMLDivElement | null = null;
    canvas: HTMLDivElement | null = null;
    command: ICanvasCommand = CanvasCommand;

    /**
     * 由于使用的时PureComponent,所有不变的数据直接放在state中,变化的数据放过在CanvasStae中
     * @param props any
     */
    constructor(props: any) {
        super(props);
        this.state = {
            anchor: null
            // selectedCids: Set<string>()
        } as Readonly<ICanvasState>;
        this.command = CanvasCommand;
    }

    getComponent = (cid: string): IComponent | null => {
        const ref = this.refs[`c.${cid}`] as any;

        return (ref as IComponent) || null;
    }

    setUndo = () => {
        const demoComponent = this.getComponent('DemoComponent');

        if (null !== demoComponent) {
            demoComponent.undo();
        } else {
            console.log('nima');
        }
    }

    setRedo = () => {
        const demoComponent = this.getComponent('DemoComponent');

        if (null !== demoComponent) {
            demoComponent.redo();
        } else {
            console.log('nima');
        }
    }

    /**
     * 组件选中，画布不要记录组件的位置与大小信息，否则同步信息很乱
     * @param cid 组件ID
     */
    selectionChanging = (cid: string, e: any): void => {
        const com = this.getComponent(cid);
        if (com) {
            // 组件选择
            this.command.addSelectedComponent(cid, com);
            this.repairSelected();
            this.command.drawDragBox(this.props.componentPosition);
        }
    }

    /**
     * 阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断e.target来避免
     * 判断事件源是否是画布
     */
    onMouseEvent = (e: any): boolean => {
        console.log(e.target.className);
        // 若未在canva元素上出发则返回
        if (e.target && (e.target.className.startsWith('canvas') || e.target.className.startsWith('container'))) {
            return true;
        }

        return false;
    }

    handlerMouseDown = (e: any) => {
        // 鼠标按下时，计算鼠标位置
        const pos = this.props.componentPosition;
        const anchor = this.command.anchorCalc(
            e.pageX - pos.stageOffset.left - pos.canvasOffset.left,
            e.pageY - pos.stageOffset.top - pos.canvasOffset.top
        );
        if (anchor) {                           // 锚点上点击
            this.command.anchorMouseDown(e, anchor);
        } else if (this.onMouseEvent(e)) {      // 画布上的点击
            this.command.canvasMouseDown(e);
            // 非多选模式下，清楚所有组件选中状态
            if (!this.command.isMultiselect()) {
                this.clearSelected();
            }
            console.log('mousedown');
        } else {                                // 组件中的点击
            this.command.componentMouseDown(e);
            console.log('com mouse down');
        }
    }

    handlerMouseUp = (e: any) => {
        if (this.onMouseEvent(e)) {
            this.command.canvasMouseUp(e);
            console.log('mouseup');
        } else {
            console.log('com mouse up');
            this.command.componentMouseUp(e);
        }

        // 清除拉选框
        this.clearChoiceBox();
        // 清楚移动框
        this.command.clearDragBox();
    }

    handleMouseMove = (e: any) => {
        console.log('mouseMove:' + e.target.className + ',type:' + this.command.getDragType());
        if (this.command.isMouseDown()) {  // 鼠标按下才开始计算
            const pointStart = this.command.getPointerStart();
            const offset = {
                x: e === undefined ? 0 : e.pageX - pointStart.x,
                y: e === undefined ? 0 : e.pageY - pointStart.y
            };
            switch (this.command.getDragType()) {
                case DragType.None: return;
                case DragType.Choice: return this.drawChoiceBox(pointStart.x, pointStart.y, offset);
                case DragType.Stretch: return this.command.anchorMove(offset);
                case DragType.Shift: {
                    // 档偏移量超过10后才开始处理拖拽事件，并隐藏选中框
                    if (Math.abs(offset.x) > 10 || Math.abs(offset.y) > 10) {
                        this.command.moveDragBox(offset);
                        this.hideSelected();
                    }

                    return;
                }
            }
        } else {    // 鼠标未按下时，计算鼠标位置
            const pos = this.props.componentPosition;
            const anchor = this.command.anchorCalc(
                e.pageX - pos.stageOffset.left - pos.canvasOffset.left,
                e.pageY - pos.stageOffset.top - pos.canvasOffset.top
            );
            this.setState({ anchor });
        }
    }

    handleMouseLeave = (e: any) => {
        // 清除拉选框
        this.clearChoiceBox();
        // 清楚移动框
        this.command.clearDragBox();
        this.command.canvasMouseUp(e);
    }

    componentDidMount() {
        CanvasCommand.initCanvas();
        document.addEventListener('mousemove', this.handleMouseMove);
        if (this.container && this.canvas) {
            this.container.addEventListener('mousedown', this.handlerMouseDown);
            this.container.addEventListener('mouseup', this.handlerMouseUp);
            // 异常鼠标不在画布内释放了
            this.container.addEventListener('mouseleave', this.handleMouseLeave);
        }
    }

    render() {
        const { componentPosition, components } = this.props;
        const children = this.getChildrenComponent(components);
        const cursor = this.state.anchor ? this.state.anchor.cursor : 'default';

        return (
            <div
                ref={(handler) => this.container = handler}
                className="container"
                style={{ ...ContainerStyle, cursor }}
            >
                <div
                    ref={(handler) => this.canvas = handler}
                    className="canvas"
                    style={CanvasStyle(componentPosition.canvasOffset)}
                >
                    {children}
                </div>
            </div>
        );
    }

    getChildrenComponent = (components: { [key: string]: any }): React.ReactFragment => {
        const array: { [key: string]: any } = {};
        let zIndex = 0;
        components.map((cs: { [key: string]: any }) => {
            const csType = util.componentsType(cs.t);
            array[cs.p.id] = React.createElement(csType,
                Object.assign({}, { data: cs.p }, {
                    zIndex,
                    ref: `c.${cs.p.id}`,
                    selectionChanging: this.selectionChanging,
                    repairSelected: this.repairSelected
                })
            );
            zIndex++;
        });
        const createFragment = require('react-addons-create-fragment');

        return createFragment(array);
    }

    /**
     * 绘制组件选中框
     */
    drawSelected = (cids: Set<string>) => {
        const draw = this.props.getDraw();
        if (draw !== null) {
            draw.setSelectedCids(cids);
        }
    }

    /**
     * 重新绘制组件选中框
     */
    repairSelected = () => {
        console.log('重新绘制组件选中框' + this.command.getDragType());
        this.drawSelected(this.command.getSelectedCids());
    }

    /**
     * 隐藏组件选中框
     */
    hideSelected = () => {
        this.drawSelected(Set<string>());
    }

    /**
     * 清除组件选中框
     */
    clearSelected = () => {
        this.command.clearSelectedComponent();
        this.hideSelected();
    }

    /**
     * 绘制鼠标选择框
     */
    drawChoiceBox = (pointX: number, pointY: number, offset: { x: number, y: number }) => {
        // 通知绘画层出现选择框
        const draw = this.props.getDraw();
        if (draw !== null) {
            draw.drawChoiceBox({ pointX, pointY, offset });
        }
    }

    /**
     * 清理鼠标选择框
     */
    clearChoiceBox = () => {
        // 通知绘画层清理选择框
        const draw = this.props.getDraw();
        if (draw !== null) {
            draw.drawChoiceBox(null);
        }
    }

}
