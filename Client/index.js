"use strict"
import { weekdaysShort } from 'moment-timezone';
import ws from '../Client/websocket'
import { appendMessage, get, formatDate, random } from './event';
class MyClass {

    constructor() {
        // Icons made by Freepik from www.flaticon.com
        const BOT_IMG = "../Client/img/hetset.png";
        const PERSON_IMG = "../Client/img/client.png";
        const BOT_NAME = "eCentrix";
        var PERSON_NAME = "";
        var user_id = "";
        var divLeft = get(".left-msg");
        var divRight = get(".right-msg");


        const msgerForm = get(".msger-inputarea");
        const msgerInput = get(".msger-input");

        const BOT_MSGS = [
            "Hi, how are you?",
            "Ohh... I can't understand what you trying to say. Sorry!",
            "I like to play games... But I don't know how to play!",
            "Sorry if my answers are not relevant. :))",
            "I feel sleepy! :("
        ];

        var wsconnection = new ws($('#myid').val());

        // wsconnection.listUser(function(x){
        //     console.log($('#myid').val());
        //     $('#listUsers').html('');
        //     $.each(x, function(key, value){
        //         $('#listUsers').append('<option value="'+value.id+'">'+value.id+'</option>');
        //     });
        // });

        function getCookie(cname) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        $('#logoutBtn').click(function () {
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            // wssconnection.

            document.getElementById("fill-form").style.display = "block";
            document.getElementById("myForm").style.display = "none";
        })

        $('.open-button').click(function () {
            var user = getCookie("username");
            document.getElementById("open-button").style.display = "none";
            if (document.cookie == "") {
                document.getElementById("fill-form").style.display = "block";
            }
            else {
                document.getElementById("myForm").style.display = "block";
                alert("Welcome again " + user);
            }
        });

        $('#closechat-button').click(function () {
            document.getElementById("fill-form").style.display = "none";
            document.getElementById("open-button").style.display = "block";
            divLeft.remove();
            divRight.remove();
        })

        $('.cancel').click(function () {
            document.getElementById("myForm").style.display = "none";
            document.getElementById("open-button").style.display = "block";
        });

        // $('#btnSend').click(function () {
        //     if (user_id == "") {
        //         user_id = getCookie("username");
        //         wsconnection.getName(user_id, function (rs) {
        //             // PERSON_NAME = rs[0].name
        //             console.log('ini id nya cuy', rs);
        //             PERSON_NAME = rs.name;
        //         })

        //     }
        //     wsconnection.sentChat(user_id, 'agent nisa', $('#chat-input').val(), function (rs) {
        //         console.log('>>> return message', rs);
        //         $('#msg').val('')
        //     })
        // });


        $('#fillBtn').click(function () {
            if ($('#name').val() != '' && $('#email').val() != '') {
                user_id = random("client");
                PERSON_NAME = $('#name').val();
                wsconnection.login($('#name').val(), $('#email').val(), "client 2", user_id, function (rs) {
                    console.log('>>> login ', rs);
                    setCookie("username", rs.id, 10);
                    $('#myid').val(rs.name);
                    wsconnection.listUser(function (x) {
                        console.log($('#myid').value);
                        console.log('---')
                        console.log(x)
                        console.log('---')
                        $('#listUsers').html('');
                        $.each(x, function (key, value) {
                            $('#listUsers').append('<option value="' + value.name + '">' + value.name + '</option>');
                        });
                    });
                })
                $('#name').val('');
                $('#emai').val('');
                document.getElementById("fill-form").style.display = "none";
                document.getElementById("myForm").style.display = "block";

            }
            else {
                alert('WAJIB ISI EMAIL DAN NAMA');
            }
        })


        $('#call-button').click(function () {
            document.getElementById("calldiv").style.display = "block";
        })
        $('#decbtn').click(function () {
            document.getElementById("calldiv").style.display = "none";
        })
        $('#vicall-button').click(function () {
            document.getElementById("vid_div").style.display = "block";
        })
        $('#decvidbtn').click(function () {
            document.getElementById("vid_div").style.display = "none";
        })




        msgerForm.addEventListener("submit", event => {
            event.preventDefault();

            var nameClient = PERSON_NAME;

            if (user_id == "") {
                user_id = getCookie("username");
                wsconnection.getName(user_id, function (rs) {
                    // PERSON_NAME = rs[0].name
                    console.log('ini id nya cuy', rs);
                    PERSON_NAME = rs.name;
                    nameClient = rs.name;
                })
            }


            const msgText = msgerInput.value;
            if (!msgText) return;

            appendMessage(nameClient, PERSON_IMG, "right", msgText);

            wsconnection.sentChat(user_id, 'agent nisa', $('#chat-input').val(), function (rs) {
                console.log('>>> return message', rs);
                $('#msg').val('')
            })

            msgerInput.value = "";

            // wsconnection.sentChat(user_id, 'agent nisa', $('#chat-input').val(), function (rs) {
            //     console.log('>>> return message', rs);
            //     $('#msg').val('')
            // })
            // botResponse();
        });

        function setCookie(cname, cvalue, exdays) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays * 60 * 1000));
            let expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function botResponse() {
            const r = random(0, BOT_MSGS.length - 1);
            const msgText = BOT_MSGS[r];
            const delay = msgText.split(" ").length * 100;

            setTimeout(() => {
                appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
            }, delay);
        }



        $('#call-button').click(function () {
            document.getElementById("calldiv").style.display = "block";
        })
        $('#decbtn').click(function () {
            document.getElementById("calldiv").style.display = "none";
        })
        $('#vicall-button').click(function () {
            document.getElementById("vid_div").style.display = "block";
        })
        $('#decvidbtn').click(function () {
            document.getElementById("vid_div").style.display = "none";
        })

    }
}
new MyClass();