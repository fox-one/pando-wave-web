import Vue from "vue";
import { mixin, Base64 } from "@foxone/utils";
import { EVENTS } from "@/constants";
import { GlobalMutations } from "@/store/types";
import { v4 as uuid } from "uuid";

export interface Callbacks {
  success?: (...args: any) => void;
  error?: (...args: any) => void;
}

export interface TransferParams {
  recipient: string;
  assetId: string;
  amount: string;
  traceId: string;
  memo: string;
}

export interface BuyEarningParams {
  client_id: string;
  asset_id: string;
  amount: string;
  product_id: string;
}

export interface RedeemEarningParams {
  amount: string;
  product_id: number;
}

export const EarningProductAction = {
  Buy: "earning_buy",
  Redeem: "earning_redeem",
  Deposit: "earning_deposit",
};

export const OrderStatus = {
  Closed: "closed",
  Processing: "processing",
  Done: "done",
  Canceled: "canceled",
};

export type CheckerResult = "done" | "pending" | "error";

export type Checker = () => Promise<CheckerResult>;

// buy earnings
export async function buy(vm: Vue, params: BuyEarningParams, cbs: Callbacks) {
  const followId = uuid();
  const memo = {
    a: EarningProductAction.Buy,
    p1: params.product_id,
    p2: followId,
  };

  return payment(
    vm,
    {
      recipient: params.client_id,
      assetId: params.asset_id,
      amount: params.amount,
      traceId: followId,
      memo: Base64.encode(JSON.stringify(memo)),
    },
    () => checkerOrder(vm, followId),
    cbs,
  );
}

// redeem earnings
export async function redeem(vm: Vue, params: RedeemEarningParams, cbs: Callbacks) {
  const followId = uuid();

  await vm.$apis.redeemEarningProduct(params.product_id, {
    amount: params.amount,
    follow_id: followId,
  });

  showPaying(vm, { text: "Check Result" });
  pollingResult(vm, () => checkerOrder(vm, followId, OrderStatus.Processing), cbs);
}

export async function checkerOrder(vm: Vue, followId: string, status = OrderStatus.Done) {
  const resp = await vm.$apis.getOrder(followId);

  if (resp.status === status) {
    return "done";
  } else {
    return "pending";
  }
}

export async function payment(vm: Vue, params: TransferParams, checker: Checker, cbs: Callbacks) {
  const url = mixin.genPaymentUrl(params);
  const isMixin = mixin.isMixin();

  if (vm.$fennec.connected) {
    showPaying(vm);
    pollingResult(vm, checker, cbs);

    vm.$fennec.ctx?.wallet.transfer({
      asset_id: params.assetId,
      trace_id: params.traceId,
      memo: params.memo,
      opponent_id: params.recipient,
      amount: params.amount,
    });
  } else if (isMixin) {
    window.location.href = url;

    showPaying(vm);
    pollingResult(vm, checker, cbs);
  } else {
    vm.$root.$emit(EVENTS.PAY_QR_CODE, url, checker, cbs);
  }
}

export async function pollingResult(vm: Vue, checker: Checker, cbs: Callbacks) {
  const result = await checker();

  if (!vm.$store.state.app.paying.visible) return;

  if (result === "done") {
    cbs.success?.();
    hidePaying(vm);
  } else if (result === "error") {
    cbs.error?.();
    hidePaying(vm);
  } else {
    const timer = setTimeout(() => {
      pollingResult(vm, checker, cbs);
    }, 2000);

    setPayingTimer(vm, timer);
  }
}

export function showPaying(vm: Vue, params = { text: "" }) {
  vm.$store.commit(GlobalMutations.SET_PAYING, { visible: true, ...params });
}

export function hidePaying(vm: Vue) {
  vm.$store.commit(GlobalMutations.SET_PAYING, { visible: false });
}

export function setPayingTimer(vm: Vue, timer) {
  vm.$store.commit(GlobalMutations.SET_PAYING, { timer });
}
