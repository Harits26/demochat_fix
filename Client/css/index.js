"use strict"
import ws from '../Client/websocket'
class MyClass{

    constructor(){
        // $('body').html('<button class="open-button">Chat</button> <div class="chat-popup" id="myForm"><form class="form-container"><h1>Chat</h1><input type="text" name="myid" id="myid" value="user'+Math.floor(Math.random() * 10)+'"><br><select name="listUsers" id="listUsers"></select><label for="msg"><b>Message</b></label><textarea placeholder="Type message.." name="msg" id="msg" required></textarea><button type="button" class="btn" id="btnSend">Send</button><button type="button" class="btn cancel">Close</button></form></div>');
        $('body').html('<button class="open-button">Chat</button> <div class="chat-popup" id="fill-form"><form class="form-container"><h1>Chat</h1><input type="email" placeholder="email" id="email" require><input type="nama" placeholder="name" id="name" require><button type="button" class="btn" id="fillBtn">Submit</button></form></div> <div class="chat-popup" id="myForm"><form class="form-container"><h1>Chat</h1><p id="myid"></p><br><select name="listUsers" id="listUsers"></select><label for="msg"><b>Message</b></label><textarea placeholder="Type message.." name="msg" id="msg" required></textarea><button type="button" class="btn" id="btnSend">Send</button><button type="button" class="btn cancel">Close</button></form></div>');
        var wsconnection = new ws();

        wsconnection.listUser(function(x){
            $('#listUsers').html('');
            $.each(x, function(key, value){
                $('#listUsers').append('<option value="'+value.id+'">'+value.id+'</option>');
            });
        });

        $('.open-button').click(function(){
            document.getElementById("open-button").style.display = "none";
            if($("#myid").val() == "") {
                document.getElementById("fill-form").style.display = "block";
            }
            else {
                document.getElementById("myForm").style.display = "block";
            }
        });

        $('#closechat-button').click(function() {
            document.getElementById("fill-form").style.display = "none";
            document.getElementById("open-button").style.display = "block";
        })

        $('.cancel').click(function(){
            document.getElementById("myForm").style.display = "none";
            document.getElementById("open-button").style.display = "block";
        });

        $('#btnSend').click(function(){
            wsconnection.sentChat($('#myid').val(), $('#listUsers').val(), $('#msg').val(), function(rs){
                console.log('>>> return message', rs);
                $('#msg').val('')
            })
        });

        // $('.open-button').click(function(){
        //     document.getElementById("fill-form").style.display = "block";
        // });

        // $('.cancel').click(function(){
        //     document.getElementById("myForm").style.display = "none";
        // });

        // $('#btnSend').click(function(){
        //     wsconnection.sentChat($('#myid').val(), $('#listUsers').val(), $('#msg').val(), function(rs){
        //         console.log('>>> return message', rs);
        //         $('#msg').val('')
        //     })
        // });

        $('#fillBtn').click(function() {
            var id = Math.floor(Math.random() * 10);
            if($('#name').val() != '' && $('#emai').val() != '') {
                wsconnection.login("user"+id, $('#name').val(), $('#email').val(), "client 1", function(rs){
                    console.log('>>> login success', rs);
                    $('#myid').val(rs.name)
                })
                $('#name').val('');
                $('#emai').val('');
                document.getElementById("fill-form").style.display = "none";
                document.getElementById("myForm").style.display = "block";
            } 
            else{
                alert('WAJIB ISI EMAIL DAN NAMA');
            }
            // wsconnection.entryEmailName($('#namaInput').val(), $('#emailInput').val(), function(rs) {
            //     console.log('>> return email and name', rs) 
            // })
        })

    }
}
new MyClass();