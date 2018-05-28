import { Canvas } from '../Canvas';
import { IComponent, ISize, IPosition, IRichEditOption, EditType } from '../../BaseComponent';
import { DraftPublic } from '../../RichEdit';
const { EditorState, BlockUtils } = DraftPublic;

export class RichEditUtil {
    private _canvas: Canvas;
    private _dbClickComponentCid: string | null;

    /**
     * 构造函数，通过画布对象初始化
     * @param canvas 画布对象
     */
    public constructor(canvas: Canvas) {
        this._canvas = canvas;
        this._dbClickComponentCid = null;
    }

    // 编辑框开始编辑
    beginEdit = () => {
        // 获取最后选中的组件
        let currentSelectedComponent: IComponent | null = this._canvas._canvasGlobalParam.getSelectedComponents().last();
        if (this._dbClickComponentCid) {
            currentSelectedComponent = this._canvas.getComponent(this._dbClickComponentCid);
        }

        if (currentSelectedComponent !== null && currentSelectedComponent !== undefined) {
            // 展示富文本编辑器的位置
            const richEditOption: IRichEditOption = currentSelectedComponent.getRichEditOption();
            const position: IPosition = richEditOption.position;
            const size: ISize = richEditOption.size;

            // 根据不同的编辑框，操作不同
            const richEditType: EditType = currentSelectedComponent.getRichEditType();
            switch (richEditType) {
                case 'RichEdit':
                    // 隐藏组件中的富文本接收器
                    currentSelectedComponent.hiddenEditorDom(true);
                    this._canvas.getEditor().setEditState({
                        position,
                        size,
                        editorState: BlockUtils.moveSelectionToEndOfBlocks(currentSelectedComponent.getRichChildNode())
                    }, () => { this._canvas.getEditor().setFocus(); });
                    break;
            }
        }
    }

    // 编辑框结束编辑
    endEdit = () => {
        let currentSelectedComponent: IComponent | null = this._canvas._canvasGlobalParam.getSelectedComponents().last();
        if (this._dbClickComponentCid) {
            currentSelectedComponent = this._canvas.getComponent(this._dbClickComponentCid);
        }

        if (currentSelectedComponent !== null && currentSelectedComponent !== undefined) {
            // 根据不同的编辑框，操作不同
            const richEditType: EditType = currentSelectedComponent.getRichEditType();
            const editValue: any = this._canvas.getEditor().getEditValue(richEditType);
            switch (richEditType) {
                case 'RichEdit':
                    this._canvas.getEditor().setEditState({
                        position: { top: -10000, left: -10000 },
                        size: { width: 0, height: 0 },
                        style: null,
                        editorState: EditorState.createEmpty()
                    });
                    currentSelectedComponent.setRichChildNode(EditorState.createWithContent(editValue.getCurrentContent()));
                    currentSelectedComponent.hiddenEditorDom(false);
                    this._dbClickComponentCid = null;
                    break;
            }
        }
    }

    // 双击编辑
    dbClickToBeginEdit = (cid: string) => {
        const com: IComponent | null = this._canvas.getComponent(cid);
        if (com) {
            const isDbClickToEdit: boolean = com.isDbClickToEdit();
            if (isDbClickToEdit && this._canvas._isRichEditMode === false) {
                this._dbClickComponentCid = cid;
                this._canvas._canvasGlobalParam.setIsRichEditMode(true);
                this.beginEdit();
            }
        }
    }

    // 非编辑模式保持僚机的焦点
    keepWingmanFocus = () => {
        // 如果页面焦点不在僚机上
        // 判断如果有选择组件、并且焦点在body上：把焦点设置到僚机上
        if (document.activeElement.id !== 'wingman') {
            if (this._canvas._canvasGlobalParam.isSelectedComponent() && document.activeElement.tagName === 'BODY') {
                if (this._canvas._isRichEditMode === false) {
                    this._canvas.getWingman().setFocus();
                }
            }
        }
    }
}
