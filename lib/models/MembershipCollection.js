import { BaseCollectionModel } from "../models";
import { Membership } from "./Membership";
export class MembershipCollection extends BaseCollectionModel {
    constructor() {
        super(...arguments);
        this._itemType = Membership;
    }
    get _endpoint() {
        return `memberships/members`;
    }
}
