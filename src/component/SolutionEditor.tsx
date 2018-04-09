import * as React from 'react';
import BarList from './BarComponent';
import Draw from './DrawComponent/draw';
import Canvas from './CanvasComponent/canvas';
import { IDrawComponent } from './DrawComponent';
import { ICanvasComponent } from './CanvasComponent/inedx';
import './solution.css';
import { ICompos, config } from './config';

export interface ISolutionProp {
    [key: string]: any;
}

export interface ISolutionState {
    compos: ICompos;
}

/* tslint:disable:no-console */
/* tslint:disable:jsx-no-string-ref */
export default class SolutionEditor extends React.PureComponent<ISolutionProp, ISolutionState> {
    private canvas: ICanvasComponent | null = null;
    private draw: IDrawComponent | null = null;
    private stage: HTMLDivElement | null = null;

    constructor(props: ISolutionProp) {
        super(props);
        this.state = {
            compos: config.componentPosition
        };
    }

    getCanvas = () => {
        return this.canvas;
    }

    getDraw = () => {
        return this.draw;
    }

    // 修改画布的偏移量
    changeStageOffset = (titleBarCollapsed: boolean, resourceBarCollapsed: boolean, propsBarCollapsed: boolean) => {
        const newStageOffset = Object.assign({}, this.state.compos.stageOffset, {
            top: titleBarCollapsed ? 35 : 80,
            left: resourceBarCollapsed ? 24 : 184,
            right: propsBarCollapsed ? 24 : 250
        });
        this.setState({
            compos: Object.assign({}, this.state.compos, { stageOffset: newStageOffset })
        });
    }

    StageStyle = () => {
        const stageOffset = this.state.compos.stageOffset;

        return {
            top: `${stageOffset.top}px`,
            left: `${stageOffset.left}px`,
            right: `${stageOffset.right}px`,
            bottom: `${stageOffset.bottom}px`
        } as React.CSSProperties;
    }

    // 获取stage上滚动条的偏移量
    getStageScroll = () => {
        let scrollLeft: number = 0;
        let scrollTop: number = 0;
        if (this.stage !== null) {
            scrollLeft = this.stage.scrollLeft;
            scrollTop = this.stage.scrollTop;
        }

        return { scrollLeft, scrollTop };
    }

    render() {
        const { compos } = this.state;
        const stateStyle = this.StageStyle();
        console.log('重绘了stage');

        return (
            <div className="main-editor">
                <BarList changeStageOffset={this.changeStageOffset} />
                <div ref={(render) => this.stage = render} className="stage" style={stateStyle}>
                    <Draw
                        ref={(render) => this.draw = render}
                        getCanvas={this.getCanvas}
                        componentPosition={compos}
                        getStageScroll={this.getStageScroll}
                    />
                    <Canvas
                        ref={(render) => this.canvas = render}
                        getDraw={this.getDraw}
                        componentPosition={compos}
                        getStageScroll={this.getStageScroll}
                        components={detail.content.components}
                    />
                </div>
            </div>
        );
    }
}

const detail = {
    content: {
        components: [
            {
                t: 'Demo',
                p: {
                    id: 'cs1',
                    txt_v: '我是测试组件1',
                    w: 200,
                    h: 125,
                    l: 10,
                    t: 10
                }
            },
            {
                t: 'Demo',
                p: {
                    id: 'cs2',
                    txt_v: '我是测试组件2',
                    w: 300,
                    h: 200,
                    l: 300,
                    t: 10
                }
            },
            {
                t: 'Demo',
                p: {
                    id: 'cs3',
                    txt_v: '我是测试组件3',
                    w: 200,
                    h: 200,
                    l: 150,
                    t: 150
                }
            }
        ]
    },
    layout: { mode: 'free' }
};
