/**
 * Created by keigo on 2014/04/22.
 */


module Message {

    "use strict";

    export class Method {
        returnType:string = "void";
        methodName:string = "NoName";
        args:Argument[] = [];
    }

    export class Argument {
        opt:string = "";
        type:string = "NoType";
        name:string = "NoName";
    }
}

