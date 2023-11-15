/* eslint-disable */
// @generated by protobuf-ts 2.9.1 with parameter eslint_disable
// @generated from protobuf file "comment.proto" (syntax proto3)
// tslint:disable
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Mark } from "./meme";
/**
 * @generated from protobuf message CommentsResponse
 */
export interface CommentsResponse {
}
/**
 * @generated from protobuf message CommentsResponse.CommentItem
 */
export interface CommentsResponse_CommentItem {
    /**
     * @generated from protobuf field: uint32 id = 1;
     */
    id: number;
    /**
     * @generated from protobuf field: string text = 2;
     */
    text: string;
    /**
     * @generated from protobuf field: uint32 vkId = 3;
     */
    vkId: number;
    /**
     * @generated from protobuf field: int32 likesCount = 4;
     */
    likesCount: number;
    /**
     * @generated from protobuf field: uint32 createdAt = 5;
     */
    createdAt: number;
    /**
     * @generated from protobuf field: optional Mark mark = 6;
     */
    mark?: Mark;
}
/**
 * @generated from protobuf message CommentsResponse.CommentsListResponse
 */
export interface CommentsResponse_CommentsListResponse {
    /**
     * @generated from protobuf field: uint32 count = 1;
     */
    count: number;
    /**
     * @generated from protobuf field: repeated CommentsResponse.CommentItem items = 2;
     */
    items: CommentsResponse_CommentItem[];
}
// @generated message type with reflection information, may provide speed optimized methods
class CommentsResponse$Type extends MessageType<CommentsResponse> {
    constructor() {
        super("CommentsResponse", []);
    }
    create(value?: PartialMessage<CommentsResponse>): CommentsResponse {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CommentsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CommentsResponse): CommentsResponse {
        return target ?? this.create();
    }
    internalBinaryWrite(message: CommentsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message CommentsResponse
 */
export const CommentsResponse = new CommentsResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CommentsResponse_CommentItem$Type extends MessageType<CommentsResponse_CommentItem> {
    constructor() {
        super("CommentsResponse.CommentItem", [
            { no: 1, name: "id", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "text", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "vkId", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "likesCount", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 5, name: "createdAt", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 6, name: "mark", kind: "enum", opt: true, T: () => ["Mark", Mark] }
        ]);
    }
    create(value?: PartialMessage<CommentsResponse_CommentItem>): CommentsResponse_CommentItem {
        const message = { id: 0, text: "", vkId: 0, likesCount: 0, createdAt: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CommentsResponse_CommentItem>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CommentsResponse_CommentItem): CommentsResponse_CommentItem {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 id */ 1:
                    message.id = reader.uint32();
                    break;
                case /* string text */ 2:
                    message.text = reader.string();
                    break;
                case /* uint32 vkId */ 3:
                    message.vkId = reader.uint32();
                    break;
                case /* int32 likesCount */ 4:
                    message.likesCount = reader.int32();
                    break;
                case /* uint32 createdAt */ 5:
                    message.createdAt = reader.uint32();
                    break;
                case /* optional Mark mark */ 6:
                    message.mark = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CommentsResponse_CommentItem, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).uint32(message.id);
        /* string text = 2; */
        if (message.text !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.text);
        /* uint32 vkId = 3; */
        if (message.vkId !== 0)
            writer.tag(3, WireType.Varint).uint32(message.vkId);
        /* int32 likesCount = 4; */
        if (message.likesCount !== 0)
            writer.tag(4, WireType.Varint).int32(message.likesCount);
        /* uint32 createdAt = 5; */
        if (message.createdAt !== 0)
            writer.tag(5, WireType.Varint).uint32(message.createdAt);
        /* optional Mark mark = 6; */
        if (message.mark !== undefined)
            writer.tag(6, WireType.Varint).int32(message.mark);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message CommentsResponse.CommentItem
 */
export const CommentsResponse_CommentItem = new CommentsResponse_CommentItem$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CommentsResponse_CommentsListResponse$Type extends MessageType<CommentsResponse_CommentsListResponse> {
    constructor() {
        super("CommentsResponse.CommentsListResponse", [
            { no: 1, name: "count", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "items", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => CommentsResponse_CommentItem }
        ]);
    }
    create(value?: PartialMessage<CommentsResponse_CommentsListResponse>): CommentsResponse_CommentsListResponse {
        const message = { count: 0, items: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CommentsResponse_CommentsListResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CommentsResponse_CommentsListResponse): CommentsResponse_CommentsListResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 count */ 1:
                    message.count = reader.uint32();
                    break;
                case /* repeated CommentsResponse.CommentItem items */ 2:
                    message.items.push(CommentsResponse_CommentItem.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CommentsResponse_CommentsListResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 count = 1; */
        if (message.count !== 0)
            writer.tag(1, WireType.Varint).uint32(message.count);
        /* repeated CommentsResponse.CommentItem items = 2; */
        for (let i = 0; i < message.items.length; i++)
            CommentsResponse_CommentItem.internalBinaryWrite(message.items[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message CommentsResponse.CommentsListResponse
 */
export const CommentsResponse_CommentsListResponse = new CommentsResponse_CommentsListResponse$Type();