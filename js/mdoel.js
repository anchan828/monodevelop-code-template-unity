/**
 * Created by keigo on 2014/04/22.
 */
var Message;
(function (Message) {
    "use strict";
    var Method = (function () {
        function Method() {
            this.returnType = "void";
            this.methodName = "NoName";
            this.args = [];
        }
        return Method;
    })();
    Message.Method = Method;
    var Argument = (function () {
        function Argument() {
            this.opt = "";
            this.type = "NoType";
            this.name = "NoName";
        }
        return Argument;
    })();
    Message.Argument = Argument;
})(Message || (Message = {}));
//# sourceMappingURL=mdoel.js.map