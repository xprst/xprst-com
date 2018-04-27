import * as React from 'react';
import {
    BaseComponent, BaseStyle, IBaseProps, IBaseState
} from '../../BaseComponent';
import { InputState } from './InputState';
import { Input  as AntInput } from 'antd';
import { Map } from 'immutable';
import { PropertiesEnum } from '../../config';

// tslint:disable-next-line:no-empty-interface
export interface IDemoProps extends IBaseProps {

}

export default class Input extends BaseComponent<IDemoProps, IBaseState> {
    private com: any = null;
    constructor(props: IDemoProps, context?: any) {
        super(props, context);

        this.state = {
            baseState: this.initBaseStateWithCustomState(new InputState())
        };
    }

    render() {

        return (

            <div
                onMouseDown={this.fireSelectChange}
                ref={(handler: HTMLElement | null) => this.com = handler}
                style={BaseStyle(this.getPositionState(), this.getSizeState(), this.getHierarchy(), false)}
            >
                <AntInput
                    defaultValue={this.getCustomState().getDefaultValue()}
                    placeholder={this.getCustomState().getPlaceholder()}
                    onClick={this.onClick}
                    // value={this.getRichChildNode()}
                    value={this.getRichChildNode()}
                />
            </div>
        );
    }

    public getPropertiesToCommand = (): Array<{pTitle: string, pKey: string, pValue: any, pType: string}>  => {
        return [
                {
                    pTitle: '占位符',
                    pKey: 'placeholder',
                    pValue: this.getCustomState().getPlaceholder(),
                    pType: PropertiesEnum.INPUT_STRING
                },
                // {
                //     pTitle: '值',
                //     pKey: 'value',
                //     pValue: this.getCustomState().getValue(),
                //     pType: PropertiesEnum.INPUT_STRING
                // },
                {
                    pTitle: '默认值',
                    pKey: 'defaultvalue',
                    pValue: this.getCustomState().getDefaultValue(),
                    pType: PropertiesEnum.INPUT_STRING
                }
            ];
    }

    public setPropertiesFromCommand = (pKey: string, pValue: any) => {
        let properties = Map();
        properties = properties.set(pKey, pValue);
        const newInputState: InputState = InputState.set(this.getCustomState(), properties);

        this.setCustomState(newInputState);
    }

    public getPropertiesToProperty = (): Array<{pTitle: string, pKey: string, pValue: any, pType: string}>  => {
        return [
                {
                    pTitle: '占位符',
                    pKey: 'placeholder',
                    pValue: this.getCustomState().getPlaceholder(),
                    pType: PropertiesEnum.INPUT_STRING
                },
                // {
                //     pTitle: '值',
                //     pKey: 'value',
                //     pValue: this.getCustomState().getValue(),
                //     pType: PropertiesEnum.INPUT_STRING
                // },
                {
                    pTitle: '默认值',
                    pKey: 'defaultvalue',
                    pValue: this.getCustomState().getDefaultValue(),
                    pType: PropertiesEnum.INPUT_STRING
                }
            ];
    }

    public setPropertiesFromProperty = (pKey: string, pValue: any) => {
        let properties = Map();
        properties = properties.set(pKey, pValue);
        const newInputState: InputState = InputState.set(this.getCustomState(), properties);

        this.setCustomState(newInputState);
    }

    private onClick = () => {
        const newInputState: InputState = InputState.set(
            this.getCustomState(),
            {
                placeholder: 'this is a new placeholder'
            }
        );

        this.setCustomState(newInputState);
    }

}
