<%--
  Created by IntelliJ IDEA.
  User: viethoang
  Date: 9/7/2020
  Time: 8:14 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<link rel="stylesheet" href="css/chi_tiet_cong_trinh.css">
<script src="ajax/pages/page_chi_tiet_cong_trinh.js"></script>
<script src="js/lienhe.js"></script>
<script async defer crossorigin="anonymous"
        src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v8.0&appId=305080727577465&autoLogAppEvents=1"
        nonce="AI6nZZbG"></script>
<div class="d-none" id="page-id" data-page-id="<%=request.getParameter("id")%>"></div>
<div class="col-12 col-md-8 col-lg-9 tinTuc__element mt-5 mt-md-5">
    <!-- hidden element -->
    <div class="row d-none" id="hidden-chiTietTinTuc">
        <div class="col-12">
            <div class="tinTuc__element--img">
                <img class="img-fluid"
                     src="https://thietbidienpanasonic.com/wp-content/uploads/2018/08/bep-dien-tu-panasonic-chat-luong-1024x555.jpg"
                     alt="">
            </div>
        </div>
        <div class="col-12 d-flex justify-content-between mt-3 ">
            <p class="tinTuc__title--autho text-left text-uppercase align-text-bottom">được đăng
                vào <a href="">28 tháng Tám</a> bởi Panasonic Việt Nam</p>
            <div class="">
                <span class="">Like</span>
                <span class="">Share</span>
            </div>
        </div>
        <div class="col-12">
            <div class="tinTuc__previewTinTuc font-weight-bold">

            </div>
        </div>
        <div class="col-12">
            <div class="tinTuc__contentTinTuc">

            </div>
        </div>
        <div class="col-12 text-left align-text-bottom  mt-3 mt-md-5">
            <h4 class="text-uppercase font-weight-bold">Mục liên quan</h4>
            <div class="text-left tinTuc__title--tagsTinTuc"
                           style="font-size: 12px; color: #007bff;"></div>

        </div>

    </div>
    <!--end hidden element -->


    <div class="row tinTuc__comment mt-3 mt-md-5">
        <div class="fb-comments" data-order-by="reverse_time"
             data-href="https://haphatsmarthome.com/chi-tiet-tin-tuc?id=<%=request.getParameter("id")%>"
             data-numposts="5" data-width="100%"></div>
    </div>
</div>