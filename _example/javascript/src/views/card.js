$.ku4webApp.view("card", {
    displayCardList: function(data) {
        this._clearSite();
        var cardList = this.$template("card").renderCardList(data);
        $("#site").append(cardList);
        this.$navigator().write("card.list");
    },
    displayCreateCard: function(card) {
        this._clearSite();
        var cardForm = this.$template("card").renderAddCardForm();
        $("#site").append(cardForm);
        this.$navigator().write("card.add");

         $("#cardPhotoField").on("change", function() {
            $.image.dataUrlFromFile(this.files[0], function(dataUrl){
                $(".js-card-photo").attr("src", dataUrl);
            }, this, { maxDims: [200, 200] });
        });
    },
    displayAddCard: function(card) {
        this._clearSite();
        var cardForm = this.$template("card").renderAddCardForm();
        $("#site").append(cardForm);
        this.$navigator().write("card.list");
    },
    displayEditCard: function(card) {
        this._clearSite();
        var cardForm = this.$template("card").renderEditCardForm(card);
        $("#site").append(cardForm);
        this.$form("card").write(card);
        this.$navigator().write("card.edit", card.id);

        $("#cardPhotoField").on("change", function() {
            $.image.dataUrlFromFile(this.files[0], function(dataUrl){
                $(".js-card-photo").attr("src", dataUrl);
            }, this, { maxDims: [200, 200] });
        });
    },
    displayCardInvalid: function(messages) {
        alert($.exampleErrorMessage(messages));
    },
    displayCardListError: function(data) {
        console.log("displayCardListError", data);
    },
    displayEditCardError: function() {
        this.$navigator().route();
    },
    displayCardUpdatedError: function(data) {
        console.log("displayCardUpdatedError", data);
    },
    displayError: function(data) {
        console.log("displayError", data);
    },
    _clearSite: function() {
        $("#site").html("");
    }
},
{
    "onCardsListed":        "displayCardList",
    "onCardAdded":          "displayCardList",
    "onCreateCard":         "displayCreateCard",
    "onAddCard":            "displayAddCard",
    "onEditCard":           "displayEditCard",
    "onCardUpdated":        "displayCardList",

    "onCardInvalid":        "displayCardInvalid",

    "onCardsListedError":   "displayCardListError",
    "onEditCardError":      "displayEditCardError",
    "onCardUpdatedError":   "displayCardUpdatedError",
    "onError":              "displayError"
});