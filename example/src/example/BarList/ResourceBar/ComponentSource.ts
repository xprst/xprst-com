import { ComponentsMap } from '../../../../../src';
const {
    Demo,
    Comments,
    Universal_Button,
    Universal_CheckBox,
    Universal_Hyperlink,
    Universal_Input,
    Universal_Radio,
    Universal_Selector,
    Universal_TextField
 } = ComponentsMap;

export interface IBasePage {
    category: string;
    categoryKey: string;
    expanded: boolean;
    group?: any;
    components: any[];
}
export interface IsourceList {
    componentMode: { [key: string]: string };
    components: { [key: string]: any };
}

const basePage: IBasePage[] = [
    {
        category: '常用需求组件',
        categoryKey: 'common',
        expanded: true,
        components: [
            // TODO: 此处暂时以此方式设置组件初始宽高，之后由周周再修改
            Demo,
            Comments
        ]
    },
    {
        category: '基础组件',
        categoryKey: 'basic',
        expanded: false,
        components: [
            Universal_Button,
            Universal_CheckBox,
            Universal_Hyperlink,
            Universal_Input,
            Universal_Radio,
            Universal_Selector,
            Universal_TextField
        ]
    },
    {
        category: 'ERP页面',
        categoryKey: 'erp',
        expanded: false,
        components: [
            // TODO: 此处暂时以此方式设置组件初始宽高，之后由周周再修改
            { t: 'MapComponent/demo/BtnChildDemo', p: { name: 'BtnChildDemo'} },
            { t: 'MapComponent/map/grid/AppGridMenuItem', p: { name: 'grid菜单'} },
            { t: 'MapComponent/map/form/AppFormMenuItem', p: { name: 'form菜单'} },
            { t: 'MapComponent/map/form/NavBarItem', p: { name: 'NavBarItem'} },
            { t: 'MapComponent/map/form/TabItem', p: { name: 'TabItem'} },
            { t: 'MapComponent/map/AppGridTitle', p: { name: '列表-列'} },
            { t: 'MapComponent/map/form/field/InputField', p: { name: '输入框'} }
        ]
    },
    {
        category: 'ERP典型页面',
        categoryKey: 'StandardUI',
        expanded: false,
        components: []
    },
    {
        category: '重构页面(试用)',
        categoryKey: 'newERP',
        expanded: false,
        components: []
    },
    {
        category: '新采招页面(试用)',
        categoryKey: 'newCgztb',
        expanded: false,
        components: []
    }
];

const sourceList: IsourceList = {
    componentMode: {
        page: 'page',
        map: 'map',
        table: 'table',
        image: 'image',
        psps: 'psps'
    },

    components: {
        page: basePage
    }
};

export default sourceList;
