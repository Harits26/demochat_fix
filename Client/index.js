"use strict"
import ws from '../Client/websocket'
import { appendMessage, get, formatDate, random } from './event';
class MyClass {

    constructor() {
        // Icons made by Freepik from www.flaticon.com
        const BOT_IMG = "../Client/img/hetset.png";
        const PERSON_IMG = "../Client/img/client.png";
        const BOT_NAME = "eCentrix";
        var PERSON_NAME = "";

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
            document.getElementById("open-button").style.display = "block";
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
        })

        $('.cancel').click(function () {
            document.getElementById("myForm").style.display = "none";
            document.getElementById("open-button").style.display = "block";
        });

        $('#btnSend').click(function () {
            wsconnection.sentChat(PERSON_NAME, 'agent nisa', $('#chat-input').val(), function (rs) {
                console.log('>>> return message', rs);
                $('#msg').val('')
            })
        });


        $('#fillBtn').click(function () {
            if ($('#name').val() != '' && $('#email').val() != '') {
                PERSON_NAME = $('#name').val();
                wsconnection.login($('#name').val(), $('#email').val(), "client 2", function (rs) {
                    console.log('>>> login ', rs);
                    setCookie("username", rs.id, 2);
                    $('#myid').val(rs.id);
                    wsconnection.listUser(function (x) {
                        console.log($('#myid').val());
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

            const msgText = msgerInput.value;
            if (!msgText) return;

            appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
            msgerInput.value = "";

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