import * as React from 'react';

import { IPropertyGroup, IProperty, PropertiesEnum } from '../../../UniversalComponents';

import { IBaseProps } from '../IBaseProps';
import { IBaseState } from '../IBaseState';
import { MapComponent } from '../MapComponent';

import { Switch } from 'antd';
import { OrderedSet, List } from 'immutable';

// tslint:disable-next-line:no-empty-interface
export interface IAppGridMenuItemSwitchProps extends IBaseProps {
    map_gmis_txt?: string;          // 按钮名称
    map_gmis_hl?: boolean;          // 按钮高亮
}

// tslint:disable-next-line:no-empty-interface
export interface IAppGridMenuItemSwitchState extends IBaseState {
}

/* tslint:disable:jsx-no-multiline-js jsx-no-lambda no-string-literal */
export class AppGridMenuItemSwitch extends MapComponent<IAppGridMenuItemSwitchProps, IAppGridMenuItemSwitchState> {
    static defaultProps = {
        map_gmis_txt: '新建',
        map_gmis_hl: false
    };

    constructor(props: IAppGridMenuItemSwitchProps, context?: any) {
        super(props, context);

        this.state = {
            hidden: false
        };
    }

    /**
     * 获取组件属性列表
     */
    public getPropertiesToProperty = (): OrderedSet<IPropertyGroup> => {
        const { map_gmis_txt, map_gmis_hl } = this.props;
        let propertyList: List<IProperty> = List();
        let propertyGroup: OrderedSet<IPropertyGroup> = OrderedSet();

        // 列表属性
        propertyList = propertyList.push(
            { pTitle: '按钮名称', pKey: 'map_gmis_txt', pValue: map_gmis_txt, pType: PropertiesEnum.INPUT_TEXT },
            { pTitle: '高亮显示', pKey: 'map_gmis_hl', pValue: map_gmis_hl, pType: PropertiesEnum.SWITCH }
        );
        propertyGroup = propertyGroup.add(
            { groupTitle: '组件属性', groupKey: 'gridProps', isActive: true, colNum: 1, propertyList }
        );
        propertyList = List();

        return propertyGroup;
    }

    /**
     * 获取组件文本
     */
    public getRichChildNode = (): any => {
        return this.props.map_gmis_txt;
    }

    /**
     * 构建要设置的文本属性对象
     */
    public buildRichChildNode = (value: any): any => {
        const obj: any = {};
        obj['map_gmis_txt'] = value;

        return obj;
    }

    render() {
        const { map_gmis_txt, map_gmis_hl, selectedId, id, doChildDbClickToEdit } = this.props;
        const { hidden } = this.state;

        return (
            <li
                style={{ display: 'inline-block' }}
                onMouseDown={this.selectedCom}
                className={`map-switch ${selectedId === id ? 'map-select-open' : ''}`}
            >
                {
                    map_gmis_hl ?
                        (
                            <Switch key="1" size="small" defaultChecked />
                        ) :
                        (
                            <Switch key="2" size="small" defaultChecked={false} />
                        )
                }
                &nbsp;
                <label
                    ref={(ref) => this.editCom = ref}
                    style={{
                        visibility: hidden ? 'hidden' : 'visible'
                    }}
                    onDoubleClick={doChildDbClickToEdit}
                >
                    {map_gmis_txt}
                </label>
            </li>
        );
    }
}