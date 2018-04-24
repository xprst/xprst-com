import * as React from 'react';
import { MapComponent, IBaseProps } from '../index';
import { Select } from 'antd';

const Option = Select.Option;

export interface IMapProps extends IBaseProps {
    updateProps: (cid: string, updateProp: any) => void;
    map_v_txt?: string;
    map_v_o?: any;
}

export class AppView extends MapComponent<IMapProps, any> {
    static defaultProps = {
        map_v_txt: '视图',
        map_v_o: '',
        selectedId: undefined
    };

    public com: HTMLElement | null = null;

    constructor(props: any, context?: any) {
        super(props, context);

        this.state = {
            ...props
        };
    }

    public render() {
        const { map_v_txt, map_v_o, selectedId, id } = this.props;
        let arrOption = [];
        if (map_v_o instanceof Array) {
            arrOption = map_v_o;
        } else {
            arrOption = map_v_o === undefined ? [''] : map_v_o.replace(/<br>/g, '\r\n').split(/\r?\n/);
        }
        const options: any[] = [];
        if (arrOption !== undefined) {
            arrOption.map((mi: string) => {
                options.push(
                    <Option value={mi} key={mi}>{mi}</Option>
                );
            });
        }

        return (
            <table
                onClick={this.selectedCom}
                className={`csr-pc-map-app-view ${selectedId === id ? 'selectecd' : ''}`}
                ref={(ref) => this.com = ref}
                style={{ width: '100%' }}
            >
                <tbody>
                    <tr>
                        <td style={{ width: '75px', fontFamily: '宋体' }}>
                            <b style={{ color: '#66666' }}>{map_v_txt}</b>
                        </td>
                        <td>
                            <div className="first-page">
                                <Select style={{ width: '100%' }}>
                                    {options}
                                </Select>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    public onProjectValueChange = (value: string) => {
        this.setState({
            projectValue: value
        });
    }
}