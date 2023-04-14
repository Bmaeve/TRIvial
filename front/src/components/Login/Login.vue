

<template>
    <div class="sec_log">
        <h3 class="sec_log_title">MENU</h3>
    <div class="login_box">
        <!-- <div class="mb-3 row">
                <label for="sec_staticEmail" class="col-sm-2 col-form-label">Login</label>
                <div class="col-sm-12">
                    <input type="text" class="form-control" id="sec_staticEmail" value="email@example.com">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="sec_inputPassword" class="col-sm-2 col-form-label">Password</label>
                <div class="col-sm-12">
                    <input type="password" class="form-control" id="sec_inputPassword">
                </div>
            </div>
            <div class="d-grid gap-2 col-12 mx-auto">
                                        <button class="btn btn-secondary" type="button">Se sonnecter</button>
                                 </div> -->
        <button class="btn btn-outline-secondary" type="button"><a href="/TRIvial/Analyse">
                    <!-- <img src="../../assets/analytique.png"
                                                                                                                                                                                width="150" height="150" /> -->
                    <h3>Analyse</h3>
                </a></button>
        <button class="btn btn-outline-secondary" type="button"><a href="/TRIvial/Comparaisons">
                    <!-- <img src="../../assets/un-camion.png"
                                                                                                                                                                                width="150" height="150" /> -->
                    <h3>Comparaisons</h3>
                </a></button>
        <button class="btn btn-outline-secondary" type="button"><a href="/TRIvial/Secours">
                    <!-- <img src="../../assets/comparaison.png"
                                                                                                                                                                                width="150" height="150" /> -->
                    <h3>Secours</h3>
                </a></button>
        </div>
        <img src="../../assets/logo.png" width="100" height="100" class="sec_login_logo" />

    </div>
</template>
<script>
import $ from 'jquery'

export default {
    name: 'MyLogin',
    props: {

    },
    mounted() {
        $('.box').hide()
        for (var i = 1; i < 3; i++) {
            $("#check" + i).click(function () {
                console.log($(this).parent().next().toggle())
            })


        }
    }

}

</script>
<style>
.sec_log {
    background-color: black;
    width: 100%;
    height: 100vh;
}

.login_box {
    position: absolute;
    left: 35%;
    top: 25vh;
    width: 30%;
    /* height: 30vh; */
    color: white;
    display: flex;
    flex-direction: column;
}

.login_box button {
    margin-bottom: 3%;
    height: 12vh;
}

.login_box a {
    text-decoration: none;
    color: white;
}

.sec_log_title {
    position: absolute;
    left: 47%;
    top: 10vh;
    color: white;
}

.sec_login_logo {
    position: absolute;
    left: 47%;
    bottom: 10vh;
}
</style>