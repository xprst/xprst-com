import { ICanvasComponent } from '../CanvasComponent/inedx';

export interface IDrawProps {
    componentPosition: any;
    getCanvas: () => ICanvasComponent | null;
}
