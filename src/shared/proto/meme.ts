/* eslint-disable */
// @generated by protobuf-ts 2.9.1 with parameter eslint_disable
// @generated from protobuf file "meme.proto" (syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message MemeItem
 */
export interface MemeItem {
    /**
     * @generated from protobuf field: uint32 id = 1;
     */
    id: number;
    /**
     * @generated from protobuf field: string title = 2;
     */
    title: string;
    /**
     * @generated from protobuf field: string image = 3;
     */
    image: string;
    /**
     * @generated from protobuf field: optional string description = 4;
     */
    description?: string;
    /**
     * @generated from protobuf field: uint32 favoritesCount = 5;
     */
    favoritesCount: number;
    /**
     * @generated from protobuf field: bool isFavorites = 6;
     */
    isFavorites: boolean;
    /**
     * @generated from protobuf field: int32 likesCount = 7;
     */
    likesCount: number;
    /**
     * @generated from protobuf field: bool isSuggest = 8;
     */
    isSuggest: boolean;
}
/**
 * @generated from protobuf message MemeListResponse
 */
export interface MemeListResponse {
    /**
     * @generated from protobuf field: uint32 count = 1;
     */
    count: number;
    /**
     * @generated from protobuf field: repeated MemeItem items = 2;
     */
    items: MemeItem[];
}
/**
 * @generated from protobuf message MemeResponse
 */
export interface MemeResponse {
    /**
     * @generated from protobuf field: uint32 id = 1;
     */
    id: number;
    /**
     * @generated from protobuf field: string title = 2;
     */
    title: string;
    /**
     * @generated from protobuf field: string image = 3;
     */
    image: string;
    /**
     * @generated from protobuf field: optional string description = 4;
     */
    description?: string;
    /**
     * @generated from protobuf field: uint32 favoritesCount = 5;
     */
    favoritesCount: number;
    /**
     * @generated from protobuf field: bool isFavorites = 6;
     */
    isFavorites: boolean;
    /**
     * @generated from protobuf field: int32 likesCount = 7;
     */
    likesCount: number;
    /**
     * @generated from protobuf field: uint32 commentsCount = 8;
     */
    commentsCount: number;
    /**
     * @generated from protobuf field: uint32 ownerId = 9;
     */
    ownerId: number;
    /**
     * @generated from protobuf field: optional Mark mark = 10;
     */
    mark?: Mark;
    /**
     * @generated from protobuf field: optional uint32 placeInEternalRating = 11;
     */
    placeInEternalRating?: number;
    /**
     * @generated from protobuf field: optional uint32 placeInWeeklyRating = 12;
     */
    placeInWeeklyRating?: number;
}
/**
 * @generated from protobuf enum Mark
 */
export enum Mark {
    /**
     * @generated from protobuf enum value: LIKE = 0;
     */
    LIKE = 0,
    /**
     * @generated from protobuf enum value: DISLIKE = 1;
     */
    DISLIKE = 1
}
// @generated message type with reflection information, may provide speed optimized methods
class MemeItem$Type extends MessageType<MemeItem> {
    constructor() {
        super("MemeItem", [
            { no: 1, name: "id", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "image", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "description", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "favoritesCount", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 6, name: "isFavorites", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "likesCount", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 8, name: "isSuggest", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
        ]);
    }
    create(value?: PartialMessage<MemeItem>): MemeItem {
        const message = { id: 0, title: "", image: "", favoritesCount: 0, isFavorites: false, likesCount: 0, isSuggest: false };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MemeItem>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MemeItem): MemeItem {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 id */ 1:
                    message.id = reader.uint32();
                    break;
                case /* string title */ 2:
                    message.title = reader.string();
                    break;
                case /* string image */ 3:
                    message.image = reader.string();
                    break;
                case /* optional string description */ 4:
                    message.description = reader.string();
                    break;
                case /* uint32 favoritesCount */ 5:
                    message.favoritesCount = reader.uint32();
                    break;
                case /* bool isFavorites */ 6:
                    message.isFavorites = reader.bool();
                    break;
                case /* int32 likesCount */ 7:
                    message.likesCount = reader.int32();
                    break;
                case /* bool isSuggest */ 8:
                    message.isSuggest = reader.bool();
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
    internalBinaryWrite(message: MemeItem, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).uint32(message.id);
        /* string title = 2; */
        if (message.title !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.title);
        /* string image = 3; */
        if (message.image !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.image);
        /* optional string description = 4; */
        if (message.description !== undefined)
            writer.tag(4, WireType.LengthDelimited).string(message.description);
        /* uint32 favoritesCount = 5; */
        if (message.favoritesCount !== 0)
            writer.tag(5, WireType.Varint).uint32(message.favoritesCount);
        /* bool isFavorites = 6; */
        if (message.isFavorites !== false)
            writer.tag(6, WireType.Varint).bool(message.isFavorites);
        /* int32 likesCount = 7; */
        if (message.likesCount !== 0)
            writer.tag(7, WireType.Varint).int32(message.likesCount);
        /* bool isSuggest = 8; */
        if (message.isSuggest !== false)
            writer.tag(8, WireType.Varint).bool(message.isSuggest);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message MemeItem
 */
export const MemeItem = new MemeItem$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MemeListResponse$Type extends MessageType<MemeListResponse> {
    constructor() {
        super("MemeListResponse", [
            { no: 1, name: "count", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "items", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => MemeItem }
        ]);
    }
    create(value?: PartialMessage<MemeListResponse>): MemeListResponse {
        const message = { count: 0, items: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MemeListResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MemeListResponse): MemeListResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 count */ 1:
                    message.count = reader.uint32();
                    break;
                case /* repeated MemeItem items */ 2:
                    message.items.push(MemeItem.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: MemeListResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 count = 1; */
        if (message.count !== 0)
            writer.tag(1, WireType.Varint).uint32(message.count);
        /* repeated MemeItem items = 2; */
        for (let i = 0; i < message.items.length; i++)
            MemeItem.internalBinaryWrite(message.items[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message MemeListResponse
 */
export const MemeListResponse = new MemeListResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MemeResponse$Type extends MessageType<MemeResponse> {
    constructor() {
        super("MemeResponse", [
            { no: 1, name: "id", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "title", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "image", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "description", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "favoritesCount", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 6, name: "isFavorites", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "likesCount", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 8, name: "commentsCount", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 9, name: "ownerId", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 10, name: "mark", kind: "enum", opt: true, T: () => ["Mark", Mark] },
            { no: 11, name: "placeInEternalRating", kind: "scalar", opt: true, T: 13 /*ScalarType.UINT32*/ },
            { no: 12, name: "placeInWeeklyRating", kind: "scalar", opt: true, T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<MemeResponse>): MemeResponse {
        const message = { id: 0, title: "", image: "", favoritesCount: 0, isFavorites: false, likesCount: 0, commentsCount: 0, ownerId: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MemeResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MemeResponse): MemeResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 id */ 1:
                    message.id = reader.uint32();
                    break;
                case /* string title */ 2:
                    message.title = reader.string();
                    break;
                case /* string image */ 3:
                    message.image = reader.string();
                    break;
                case /* optional string description */ 4:
                    message.description = reader.string();
                    break;
                case /* uint32 favoritesCount */ 5:
                    message.favoritesCount = reader.uint32();
                    break;
                case /* bool isFavorites */ 6:
                    message.isFavorites = reader.bool();
                    break;
                case /* int32 likesCount */ 7:
                    message.likesCount = reader.int32();
                    break;
                case /* uint32 commentsCount */ 8:
                    message.commentsCount = reader.uint32();
                    break;
                case /* uint32 ownerId */ 9:
                    message.ownerId = reader.uint32();
                    break;
                case /* optional Mark mark */ 10:
                    message.mark = reader.int32();
                    break;
                case /* optional uint32 placeInEternalRating */ 11:
                    message.placeInEternalRating = reader.uint32();
                    break;
                case /* optional uint32 placeInWeeklyRating */ 12:
                    message.placeInWeeklyRating = reader.uint32();
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
    internalBinaryWrite(message: MemeResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 id = 1; */
        if (message.id !== 0)
            writer.tag(1, WireType.Varint).uint32(message.id);
        /* string title = 2; */
        if (message.title !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.title);
        /* string image = 3; */
        if (message.image !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.image);
        /* optional string description = 4; */
        if (message.description !== undefined)
            writer.tag(4, WireType.LengthDelimited).string(message.description);
        /* uint32 favoritesCount = 5; */
        if (message.favoritesCount !== 0)
            writer.tag(5, WireType.Varint).uint32(message.favoritesCount);
        /* bool isFavorites = 6; */
        if (message.isFavorites !== false)
            writer.tag(6, WireType.Varint).bool(message.isFavorites);
        /* int32 likesCount = 7; */
        if (message.likesCount !== 0)
            writer.tag(7, WireType.Varint).int32(message.likesCount);
        /* uint32 commentsCount = 8; */
        if (message.commentsCount !== 0)
            writer.tag(8, WireType.Varint).uint32(message.commentsCount);
        /* uint32 ownerId = 9; */
        if (message.ownerId !== 0)
            writer.tag(9, WireType.Varint).uint32(message.ownerId);
        /* optional Mark mark = 10; */
        if (message.mark !== undefined)
            writer.tag(10, WireType.Varint).int32(message.mark);
        /* optional uint32 placeInEternalRating = 11; */
        if (message.placeInEternalRating !== undefined)
            writer.tag(11, WireType.Varint).uint32(message.placeInEternalRating);
        /* optional uint32 placeInWeeklyRating = 12; */
        if (message.placeInWeeklyRating !== undefined)
            writer.tag(12, WireType.Varint).uint32(message.placeInWeeklyRating);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message MemeResponse
 */
export const MemeResponse = new MemeResponse$Type();
