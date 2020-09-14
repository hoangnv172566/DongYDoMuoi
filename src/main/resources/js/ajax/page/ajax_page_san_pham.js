var imgInforProduct, hrefImgInforProduct, promotionInforProduct, nameInforProduct, costInforProduct, statusInforProduct, propertiesInforProduct, quantityInforProduct, modelInforProduct, introductionInforProduct, catalogInforProduct, inputQuantity, btnBuyNow, listProductRelated, productTemp;
let idPage = null;
$(function() {
    hiddenNavHero();
    idPage = getPageId();
    imgInforProduct = $(".img-product");
    hrefImgInforProduct = $(".href-img-product");
    promotionInforProduct = $("#pro-infor-product");
    nameInforProduct = $("#name-infor-product");
    costInforProduct = $("#cost-infor-product");
    statusInforProduct = $("#status-infor-product");
    propertiesInforProduct = $("#properties-infor-product");
    // quantityInforProduct = $("#");
    modelInforProduct = $("#model-infor-product");
    introductionInforProduct = $("#introduction-infor-product");
    catalogInforProduct = $("#file-catalog");
    inputQuantity =$("#input-quantity");
    btnBuyNow = $(".buynow");
    listProductRelated = $("#list-product-related");
    productTemp = $("#product-temp");

    getInforProduct();
})

function getInforProduct() {
    if(idPage) {
        productFindById(idPage, true, true, false, true, true, false).then(rs => {
            if(rs) {
                statisticProductIncreseView(idPage);
                let {id, image, name, quantity, model, introduction} = rs.product;
                let {cost} = rs.costs[0];
                let {properties, promotion} = rs;
                let {id: idCategory, attachment} = rs.categories[0];
                imgInforProduct.attr("src", viewSrcFile(image));
                imgInforProduct.attr("alt", viewField(name));
                hrefImgInforProduct.attr("href", viewSrcFile(image));
                let {minusPrice, viewTitleGift, viewDiscount} = viewPromotionCostProduct(promotion, cost);
                //promo
                if(viewDiscount.length > 0) {
                    promotionInforProduct.find(".promo-sale").html(viewDiscount);
                } else {
                    promotionInforProduct.find(".promo-sale").remove();
                }
                if(viewTitleGift.length > 0) {
                    promotionInforProduct.find(".promo-gift").attr("title", viewTitleGift);
                } else {
                    promotionInforProduct.find(".promo-gift").remove();
                }
                runToolTip();
                //end_promo
                nameInforProduct.html(viewField(name));
                //
                if(cost != 0) {
                    if(minusPrice == 0) {
                        costInforProduct.find("del").remove();
                        costInforProduct.find("span").text(viewPriceVND(cost));
                    } else {
                        costInforProduct.find("del").text(viewPriceVND(cost));
                        costInforProduct.find("span").text(viewPriceVND(cost - minusPrice));
                    }
                    if(quantity > 0) {
                        inputQuantity.attr("max", viewField(quantity));
                        runInputSpinner();
                        btnBuyNow.attr("onclick", `addToCartHasNumber(${id}, ${quantity})`);
                    } else {
                        inputQuantity.before("<strong>Sản phẩm tạm thời hết hàng vui lòng liên hệ để biết thêm thông tin!</strong>")
                        inputQuantity.remove();
                        btnBuyNow.remove();
                    }
                } else {
                    costInforProduct.find("del").remove();
                    costInforProduct.find("span").remove();
                    inputQuantity.before("<strong>Liên hệ để mua sản phẩm</strong>")
                    inputQuantity.remove();
                    btnBuyNow.remove();
                }
                //end cost
                statusInforProduct.html(quantity > 0 ? "Còn hàng" : "Hết hàng");
                viewPropertiesProduct(properties);
                modelInforProduct.html(viewField(model));
                catalogInforProduct.attr("href", viewSrcFile(attachment));
                introductionInforProduct.html(viewField(introduction));
                //view list product related
                viewProductRelated(idCategory, id);
            }
        }).catch(err => {
            console.log(err);
            alertDanger(DANGER_PRODUCT);
        })
    } else {
        location.href = 404;
    }
}

function viewPropertiesProduct(properties) {
    let trTmp = propertiesInforProduct.find("tr");
    let listTr = "";
    if(properties) {
        listTr = properties.map(data => {
            let trClone = trTmp.clone();
            trClone.find("th").html(viewField(data.productProperty.name));
            trClone.find("td").html(viewField(data.value));
            return trClone;
        })
    }
    propertiesInforProduct.html(listTr);
}

function viewProductRelated(idCategory, idProduct) {
    productFilter(COMPANY_ID, 0, idCategory, 0, "", 0, "date", true, 1, 9).then(rs => {
        if(rs) {
            rs = rs.content.filter(data => data.id != idProduct);
            let listProduct = getListProduct(rs);
            listProductRelated.html(listProduct);
            clickBtnAddCart();
            runProductRelatedCarousel();
            runToolTip();
        }
    }).catch(err => {
        console.log(err);
        alertDanger(DANGER_PRODUCT_RELATED);
    })
}

function addToCartHasNumber(id, quantity) {
    let val = inputQuantity.val();
    if(regexNumber(val) && (val >= 1 || val <= quantity)) {
        addToCart(id, val - 0);
    }
}