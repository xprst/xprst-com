import { ISize, IPostion } from './model/types';

/**
 * BaseComponent提供的方法接口
 */
export interface IComponent {
    /**
     * 获取、设置size属性
     */
    getSize: () => ISize;
    setSize: (size: ISize) => void;

    /**
     * 获取、设置postion属性
     */
    getPostion: () => IPostion;
    setPostion: (postion: IPostion) => void;

    /**
     * 获取、设置isSelected
     */
    getIsSelected: () => boolean;
    setIsSelected: (isSelected: boolean) => void;

    /**
     * 获取、设置richChildNode
     */
    getRichChildNode: () => any;
    setRichChildNode: (richChildNode: any) => void;
}
