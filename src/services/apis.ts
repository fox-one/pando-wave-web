import Http from "@foxone/utils/http";
import { MIXIN_HOST } from "@/constants";

export default function(http: Http) {
  return {
    getPublic() {
      return http.get("/public");
    },

    auth(code: string): Promise<any> {
      let lang = navigator.language;

      if (lang.length >= 2) {
        lang = lang.slice(0, 2);
      } else {
        lang = "";
      }

      return http.post("/oauth", { data: { code, lang } });
    },

    me(): Promise<any> {
      return http.get("/users/me");
    },

    getUser(userId): Promise<any> {
      return http.get(`/users/${userId}`);
    },

    // assets
    getAssets(): Promise<API.Asset[]> {
      return http.get("/assets");
    },

    // fiat
    getFiats(): Promise<Array<any>> {
      return http.get("/fiats");
    },

    getAsset(assetId: string): Promise<API.Asset> {
      return http.get(`/assets/${assetId}`);
    },

    // produts
    getEarningProducts(): Promise<Array<any>> {
      return http.get("/earnings/all/");
    },

    getMyEarningProducts(): Promise<Array<any>> {
      return http.get("/earnings/mine/");
    },

    getEarningProduct(id): Promise<any> {
      return http.get(`/earnings/all/${id}`);
    },

    getMyEarningProduct(id): Promise<any> {
      return http.get(`/earnings/mine/${id}`);
    },

    redeemEarningProduct(id: number, data: any): Promise<any> {
      return http.post(`/earnings/mine/${id}/redeem`, {
        data,
      });
    },

    // orders
    getOrder(followID): Promise<any> {
      return http.get(`/orders/${followID}`);
    },

    // Invitations
    getRelationship(): Promise<Array<any>> {
      return http.get(`/invitations/me`);
    },

    getInvitations(): Promise<Array<any>> {
      return http.get(`/invitations`);
    },

    bindInvitation(inviterId): Promise<Array<any>> {
      return http.post(`/invitations/bind/${inviterId}`, {});
    },

    getAssetsFromMixin(): Promise<API.MixinAsset[]> {
      return http.get("/assets", { baseURL: MIXIN_HOST });
    },

    getAssetFromMixin(id: string): Promise<API.MixinAsset> {
      return http.get(`/assets/${id}`, { baseURL: MIXIN_HOST });
    },
  };
}
