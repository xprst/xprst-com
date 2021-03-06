import { Canvas } from '../../Canvas';
import { IPointerArgs, IKeyArgs } from '../../utils/MouseAndKeyUtil';

export function docMouseDown(canvas: Canvas, e: any): void {
    const args = canvas._mouseAndKeyUtil.pointerArgs(e);
    const { ctrl } = (args as IPointerArgs).keyArgs as IKeyArgs;

    // 如果是鼠标右键点击
    if (e.button === 2) {
        // 退出画布操作模式
        if (canvas._canvasUtil.isCanvasHaveMode() === true) {
            canvas._canvasUtil.exitCanvasMode();
        }
    }

    // 鼠标按下时，计算鼠标位置
    canvas._mouseAndKeyUtil.recordPointStart(e);
    // 锚点上点击
    const anchor = canvas._canvasGlobalParam.getCurrentAnchor();

    if (anchor) {
        // 如果是编辑模式：结束编辑模式
        if (canvas._isRichEditMode === true) {
            canvas._richEditUtil.endEdit();
        }

        canvas._canvasGlobalParam.anchorMouseDown(e, anchor);
        // 此处必须阻止事件冒泡，否则可能绘选中覆盖的组件
        e.stopPropagation();
        e.preventDefault();
    } else {
        switch (canvas._mouseAndKeyUtil.onMouseEventType(e)) {
            case 'component': {
                // 组件中的点击
                canvas._canvasGlobalParam.componentMouseDown(e);
                break;
            }
            case 'canvas': {
                // 画布上的点击
                // 如果是编辑模式：结束编辑模式
                if (canvas._isRichEditMode === true) {
                    canvas._richEditUtil.endEdit();
                }

                // 非多选模式下，清楚所有组件选中状态
                if (ctrl === false) {
                    canvas._drawUtil.clearSelected();
                }

                if (canvas._isAddCommentsMode === true) {
                    // 添加批注模式
                    canvas._canvasGlobalParam.canvasMouseDownAddCommentsMode(e);
                    e.stopPropagation();
                    e.preventDefault();
                } else if (canvas._isAddImageMagnifierMode === true) {
                    // 添加图片放大镜模式
                    canvas._canvasGlobalParam.canvasMouseDownAddImageMagnifierMode(e);
                    e.stopPropagation();
                    e.preventDefault();
                } else {
                    canvas._canvasGlobalParam.canvasMouseDown(e);
                }
                break;
            }
            // case 'outside': {
            //     canvas._canvasGlobalParam.outsideMouseDown(e);
            //     break;
            // }
        }
    }
}
