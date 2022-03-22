import {
  FIconList,
  FIconStatistic,
  FIconDocumentFill,
  FIconCommentFill,
  FIconChevronRight4PBold,
  FIconAdd4PBold,
} from "@foxone/icons";

const ficons = {
  FIconList: { component: FIconList },
  FIconStatistic: { component: FIconStatistic },
  FIconDocumentFill: { component: FIconDocumentFill },
  FIconCommentFill: { component: FIconCommentFill },
  FIconChevronRight4PBold: { component: FIconChevronRight4PBold },
  FIconAdd4PBold: { component: FIconAdd4PBold },
};

const icons = ["IconBullet", "IconCheck"].reduce((m, k) => ({ ...m, [k]: { component: k } }), {});

export default {
  ...ficons,
  ...icons,
};
