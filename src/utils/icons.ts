import { FIconList, FIconStatistic } from "@foxone/icons";

const ficons = {
  FIconList: { component: FIconList },
  FIconStatistic: { component: FIconStatistic },
};

const icons = ["IconBullet"].reduce((m, k) => ({ ...m, [k]: { component: k } }), {});

export default {
  ...ficons,
  ...icons,
};
