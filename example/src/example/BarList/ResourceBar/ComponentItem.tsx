import * as React from 'react';
import { Icon, Collapse } from 'antd';
import { GlobalUtil } from '../../../../../src';
import ComponentChildItem from './ComponentChildItem';

export interface IComItemProps {
    componentType: string;
    componentAdderType: any;
    componentProps: any;
    children: any[];
}

export interface IComItemState {
    [key: string]: any;
}

/* tslint:disable: jsx-no-multiline-js */
export default class ComponentItem extends React.PureComponent<IComItemProps, IComItemState> {
    private dragElement: HTMLLIElement | null = null;

    constructor(props: IComItemProps) {
        super(props);
        this.state = {
            draggable: true
        };
    }

    componentDidMount() {
        // tslint:disable-next-line:no-empty
        if (this.dragElement !== null) {
        }
    }

    render() {
        const { componentProps, children } = this.props;
        const item = (
            <li
                className="rLi"
                draggable={this.state.draggable}
                ref={(container) => { this.dragElement = container; }}
                onDragStart={this.dragStart}
                onDragEnd={this.dragEnd}
            >
                <Icon type="menu-unfold" />
                <span>{componentProps.name}</span>
            </li>
        );

        if (children) {
            return (
                <Collapse bordered={false} style={{ width: '100%' }}>
                    <Collapse.Panel header={item} key={componentProps.name}>
                        <ul className="rUl" style={{ paddingLeft: '23px' }}>
                            {
                                children.map(
                                    (child) => {
                                        return (
                                            <ComponentChildItem
                                                key={`${child.t}_${child.at || ''}`}
                                                componentType={child.t}
                                                componentAdderType={child.at}
                                                componentProps={child.p}
                                            />
                                        );
                                    }
                                )
                            }
                        </ul>
                    </Collapse.Panel>
                </Collapse>
            );
        } else {
            return item;
        }
    }

    dragStart = (evt: any) => {
        const { componentProps } = this.props;
        const comWidth = componentProps.w;
        const comHeight = componentProps.h;
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('text', evt.target.innerHTML);

        // 计算鼠标开始拖拽时的偏移量(鼠标落点与item左上角的偏移量，按比例计算)
        let offset = { x: 0, y: 0 } as { x: number, y: number };
        if (this.dragElement !== null) {
            const itemPos = GlobalUtil.getDomLocation(this.dragElement);
            offset = {
                x: Math.ceil(comWidth * (evt.pageX - itemPos.leftWithScroll) / 61),
                y: Math.ceil(comHeight * (evt.pageY - itemPos.topWithScroll) / 60)
            };
        }
        localStorage.setItem('__dnd_type', 'dragging_cs');
        if (this.props.componentType.indexOf('MapComponent') !== -1 && componentProps.type === undefined) {
            localStorage.setItem('__dnd_type', 'dragging_map');
        }
        localStorage.setItem(
            '__dnd_value',
            JSON.stringify({
                offset,
                t: this.props.componentType,
                p: this.props.componentProps
            })
        );
    }

    dragEnd = (evt: any) => {
        localStorage.removeItem('__dnd_type');
        localStorage.removeItem('__dnd_value');
    }
}
