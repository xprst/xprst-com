import { ISize, IPosition } from './index';
import * as Anchor from '../util/AnchorPoint';

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
     * 获取、设置position属性
     */
    getPosition: () => IPosition;
    setPosition: (position: IPosition) => void;

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

    /**
     * 重做、撤销
     */
    redo: () => void;
    undo: () => void;

    /**
     * 定位鼠标点击的部位
     */
    getPointerAnchor: (currentX: number, currentY: number) =>  Anchor.IAnchor | null;
}