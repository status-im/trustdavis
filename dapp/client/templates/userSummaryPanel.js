"use strict";

Template.userSummaryPanel.events({
    "click #btn-show-user-id": function (event) {
        Modal.show("userIdModal", {userId: this.user._id, name: this.user.name});
    },
    "click #btn-deposit-funds": function (event) {
        console.log(this.user.name);
        Modal.show("depositFundsModal", {userId: this.user._id, deposit: this.user.deposit, name: this.user.name});
    },
    "click #btn-add-to-peers": function (event) {
        var peer = {
            fromId: Meteor.connection.userId(),
            objectId: this.user._id
        };
        Peers.simpleSchema().clean(peer);
        Meteor.call('newPeer', peer);
    }
});

Template.userSummaryPanel.helpers({
    showAddtoPeers: function() {
        return !this.user.isMyself() && !this.user.isPeer();
    },

    showDepositForm: function() {
        return this.user.isMyself();
    }
});
