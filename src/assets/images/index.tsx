import { ReactComponent as support } from './support.svg';
import { ReactComponent as getStarted } from './get-started.svg';
import { ReactComponent as grayShadow } from './gray-shadow.svg';
import { ReactComponent as intersectLeft } from './intersect-left.svg';
import { ReactComponent as intersectRight } from './intersect-right.svg';
import { ReactComponent as adBanner } from './property.svg';
export default {
    SUPPORT: support,
    GET_STARTED: getStarted,
    GRAY_SHADOW: grayShadow,
    INTERSECT_LEFT: intersectLeft,
    INTERSECT_RIGHT: intersectRight,
    AD_BANNER: adBanner
} as {
    [key: string] : React.FC<React.SVGProps<SVGSVGElement>>;
};
