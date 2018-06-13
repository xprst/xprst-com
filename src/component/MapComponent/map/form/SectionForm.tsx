import * as React from 'react';
import { MapComponent, IBaseProps, IBaseState } from '../../index';
import { Section } from './index';
import { DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';

export interface IMapProps extends IBaseProps {
    updateProps: (cid: string, updateProp: any) => void;
    map_gm_txt?: string;
}
export interface IMapState extends IBaseState {
    dragonDrop: any;
}
// tslint:disable:jsx-no-string-ref
export class SectionForm extends MapComponent<IMapProps, any> {
    static defaultProps = {
        map_gm_txt: '标题',
        selectedId: undefined
    };

    public menus: HTMLElement | null = null;

    constructor(props: IMapProps, context?: any) {
        super(props, context);
        this.state = {
            dragonDrop: null,
            hover: {},
            ...props
        };
    }
    render() {
        const { hover } = this.state;

        const {
            updateProps,
            p,
            selectedId,
            selectComChange
        } = this.props;
        const components = p === undefined ? undefined : p.components;
        const sections: any[] = [];
        // 循环初始化菜单按钮
        if (components !== undefined) {
            components.forEach((com: any, index: number) => {
                const { t } = com;
                if (t === 'MapComponent/map/form/Section') {
                    sections.push(
                        <Section
                            key={`c.${com.p.id}`}
                            selectedId={selectedId}
                            ref={`c.${com.p.id}`}
                            selectComChange={selectComChange}
                            {...com.p}
                            updateProps={updateProps}
                            index={index}
                        />
                    );
                }
            });
        }

        const initSection = (provided: DroppableProvided, snapshot: DroppableStateSnapshot) =>
            (
                <div
                    ref={provided.innerRef}
                >
                    {sections}
                </div>
            );

        return (
            <div
                ref={(ref) => this.com = ref}
                className={`form-sectionForm`}
                style={Object.assign({}, hover)}
                onDragOver={this.handleOver}
                onDragLeave={this.handleLeave}
            >
                <DragDropContext onDragEnd={this.onDragEnd} >
                    <Droppable droppableId="droppable">
                        {initSection}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
    /*重载添加组件*/
    public componentCanBeAdded(t: string) {
        return (t === 'MapComponent/map/form/Section');
    }
}
