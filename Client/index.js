"use strict"
import ws from '../Client/websocket'
class MyClass {

    constructor() {
        // Icons made by Freepik from www.flaticon.com
        const BOT_IMG = "../Client/img/hetset.png";
        const PERSON_IMG = "../Client/img/client.png";
        const BOT_NAME = "eCentrix";
        const PERSON_NAME = $('#name').val();

        const msgerForm = get(".msger-inputarea");
        const msgerInput = get(".msger-input");
        const msgerChat = get(".msger-chat");

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

        $('.open-button').click(function () {
            document.getElementById("open-button").style.display = "none";
            if ($("#myid").val() == "") {
                document.getElementById("fill-form").style.display = "block";
            }
            else {
                document.getElementById("myForm").style.display = "block";
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
            wsconnection.sentChat(PERSON_NAME, 'agent', $('#chat-input').val(), function (rs) {
                console.log('>>> return message', rs);
                $('#msg').val('')
            })
        });

        $('#fillBtn').click(function () {
            if ($('#name').val() != '' && $('#email').val() != '') {
                wsconnection.login($('#name').val(), $('#email').val(), "client 2", function (rs) {
                    console.log('>>> login success', rs);
                    $('#myid').val(rs.name);
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

        $('#call-button').click(function() {
            document.getElementById("calldiv").style.display = "block";
        })
        $('#decbtn').click(function() {
            document.getElementById("calldiv").style.display = "none";
        })
        $('#vicall-button').click(function() {
            document.getElementById("vid_div").style.display = "block";
        })
        $('#decvidbtn').click(function() {
            document.getElementById("vid_div").style.display = "none";
        })




        msgerForm.addEventListener("submit", event => {
            event.preventDefault();

            const msgText = msgerInput.value;
            if (!msgText) return;

            appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
            msgerInput.value = "";

            botResponse();
        });

        function appendMessage(name, img, side, text) {
            //   Simple solution for small apps
            const msgHTML = `
<div class="msg ${side}-msg">
<div class="msg-img" style="background-image: url(${img})"></div>

<div class="msg-bubble">
<div class="msg-info">
  <div class="msg-info-name">${name}</div>
  <div class="msg-info-time">${formatDate(new Date())}</div>
</div>

<div class="msg-text">${text}</div>
</div>
</div>
`;

            msgerChat.insertAdjacentHTML("beforeend", msgHTML);
            msgerChat.scrollTop += 500;
        }

        function botResponse() {
            const r = random(0, BOT_MSGS.length - 1);
            const msgText = BOT_MSGS[r];
            const delay = msgText.split(" ").length * 100;

            setTimeout(() => {
                appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
            }, delay);
        }

        // Utils
        function get(selector, root = document) {
            return root.querySelector(selector);
        }

        function formatDate(date) {
            const h = "0" + date.getHours();
            const m = "0" + date.getMinutes();

            return `${h.slice(-2)}:${m.slice(-2)}`;
        }

        function random(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        $('#call-button').click(function() {
            document.getElementById("calldiv").style.display = "block";
        })
        $('#decbtn').click(function() {
            document.getElementById("calldiv").style.display = "none";
        })
        $('#vicall-button').click(function() {
            document.getElementById("vid_div").style.display = "block";
        })
        $('#decvidbtn').click(function() {
            document.getElementById("vid_div").style.display = "none";
        })

    }
}
new MyClass();