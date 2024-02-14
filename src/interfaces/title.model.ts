export class TitleProps {
    title?: string;
    fontSize?: number;
    fontWeight?: number;
}

export class BackToProps {
    path?: string;
    title?: string | string[];
    func?: string;
    has_child?: boolean;
    onClickFunc?: () => void;
    isClicked?: boolean
}