

<template>
    <div class="sec_log">
        <h3 class="title">MENU</h3>
        <div class="button_box">
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
    </div>

    <img src="../../assets/logoBlack.png" class="logo" />
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

.button_box {
    position: absolute;
    left: 35%;
    top: 25vh;
    width: 30%;
    /* height: 30vh; */
    color: white;
    display: flex;
    flex-direction: column;
}

.button_box button {
    margin-bottom: 3%;
    height: 12vh;
}

.button_box a {
    text-decoration: none;
    color: white;
}

.body {
    display: flex;
    align-items: center;
}

.title {
    position: absolute;
    left: 47%;
    top: 10vh;
    color: white;
}

.logo {
    position: absolute;
    bottom: 3vh;
    left: 50%;
    width: 300px;
    height: 300px;
    transform: translateX(-50%);
}
</style>