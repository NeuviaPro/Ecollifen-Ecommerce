import { $ as isRemoteAllowed, C as InvalidImageService, N as NoImageMetadata, V as RemoteImageNotAllowed, X as UnsupportedImageConversion, Z as UnsupportedImageFormat, c as ExpectedImage, ct as isRemotePath, d as FailedToFetchRemoteImageDimensions, f as FontFamilyNotFound, ft as removeQueryString, k as MissingImageDimension, l as ExpectedImageOptions, lt as joinPaths, t as AstroError, u as ExpectedNotESMImage, v as ImageMissingAlt, w as LocalImageUsedWrongly, y as IncompatibleDescriptorOptions } from "./errors_BGk7BsBL.mjs";
import { S as unescapeHTML, T as createComponent, _ as maybeRenderHead, n as createTransitionScope, o as renderComponent, p as renderTemplate, r as renderScript, t as spreadAttributes, u as renderSlot, v as renderHead, w as createAstro, y as addAttribute } from "./server_BlytaQjR.mjs";
import * as mime from "mrmime";
import { atom, listenKeys } from "nanostores";
import { useEffect, useState } from "preact/hooks";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/astro/components/ClientRouter.astro
createAstro("https://ecollifen.cl");
var $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ClientRouter;
	const { fallback = "animate" } = Astro.props;
	return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/node_modules/astro/components/ClientRouter.astro", void 0);
//#endregion
//#region node_modules/astro/dist/assets/consts.js
var VALID_SUPPORTED_FORMATS = [
	"jpeg",
	"jpg",
	"png",
	"tiff",
	"webp",
	"gif",
	"svg",
	"avif"
];
var DEFAULT_OUTPUT_FORMAT = "webp";
var DEFAULT_HASH_PROPS = [
	"src",
	"width",
	"height",
	"format",
	"quality",
	"fit",
	"position",
	"background"
];
//#endregion
//#region node_modules/astro/dist/assets/layout.js
var DEFAULT_RESOLUTIONS = [
	640,
	750,
	828,
	960,
	1080,
	1280,
	1668,
	1920,
	2048,
	2560,
	3200,
	3840,
	4480,
	5120,
	6016
];
var LIMITED_RESOLUTIONS = [
	640,
	750,
	828,
	1080,
	1280,
	1668,
	2048,
	2560
];
var getWidths = ({ width, layout, breakpoints = DEFAULT_RESOLUTIONS, originalWidth }) => {
	const smallerThanOriginal = (w) => !originalWidth || w <= originalWidth;
	if (layout === "full-width") return breakpoints.filter(smallerThanOriginal);
	if (!width) return [];
	const doubleWidth = width * 2;
	const maxSize = originalWidth ? Math.min(doubleWidth, originalWidth) : doubleWidth;
	if (layout === "fixed") return originalWidth && width > originalWidth ? [originalWidth] : [width, maxSize];
	if (layout === "constrained") return [
		width,
		doubleWidth,
		...breakpoints
	].filter((w) => w <= maxSize).sort((a, b) => a - b);
	return [];
};
var getSizesAttribute = ({ width, layout }) => {
	if (!width || !layout) return;
	switch (layout) {
		case "constrained": return `(min-width: ${width}px) ${width}px, 100vw`;
		case "fixed": return `${width}px`;
		case "full-width": return `100vw`;
		default: return;
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/imageKind.js
function isESMImportedImage(src) {
	return typeof src === "object" || typeof src === "function" && "src" in src;
}
function isRemoteImage(src) {
	return typeof src === "string";
}
async function resolveSrc(src) {
	if (typeof src === "object" && "then" in src) {
		const resource = await src;
		return resource.default ?? resource;
	}
	return src;
}
//#endregion
//#region node_modules/astro/dist/assets/utils/inferSourceFormat.js
var DATA_PREFIX = "data:";
function inferSourceFormat(src) {
	if (src.startsWith(DATA_PREFIX)) {
		const sepIndex = src.indexOf(";");
		const commaIndex = src.indexOf(",");
		const mimeEnd = sepIndex === -1 ? commaIndex : commaIndex === -1 ? sepIndex : Math.min(sepIndex, commaIndex);
		if (mimeEnd === -1) return void 0;
		const mime = src.slice(5, mimeEnd);
		if (mime === "image/svg+xml") return "svg";
		return mime.split("/")[1] || void 0;
	}
	try {
		const cleanSrc = removeQueryString(src).split("#")[0];
		const lastSlash = cleanSrc.lastIndexOf("/");
		const basename = lastSlash === -1 ? cleanSrc : cleanSrc.slice(lastSlash + 1);
		const lastDot = basename.lastIndexOf(".");
		if (lastDot === -1) return void 0;
		return basename.slice(lastDot + 1).toLowerCase();
	} catch {
		return;
	}
}
function resolveDefaultOutputFormat(sourceFormat) {
	return sourceFormat === "svg" ? "svg" : DEFAULT_OUTPUT_FORMAT;
}
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/utils.js
var decoder = new TextDecoder();
var toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
var toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + `0${i.toString(16)}`.slice(-2), "");
var getView = (input, offset) => new DataView(input.buffer, input.byteOffset + offset);
var readInt16LE = (input, offset = 0) => getView(input, offset).getInt16(0, true);
var readUInt16BE = (input, offset = 0) => getView(input, offset).getUint16(0, false);
var readUInt16LE = (input, offset = 0) => getView(input, offset).getUint16(0, true);
var readUInt24LE = (input, offset = 0) => {
	const view = getView(input, offset);
	return view.getUint16(0, true) + (view.getUint8(2) << 16);
};
var readInt32LE = (input, offset = 0) => getView(input, offset).getInt32(0, true);
var readUInt32BE = (input, offset = 0) => getView(input, offset).getUint32(0, false);
var readUInt32LE = (input, offset = 0) => getView(input, offset).getUint32(0, true);
var readUInt64 = (input, offset, isBigEndian) => getView(input, offset).getBigUint64(0, !isBigEndian);
var methods = {
	readUInt16BE,
	readUInt16LE,
	readUInt32BE,
	readUInt32LE
};
function readUInt(input, bits, offset = 0, isBigEndian = false) {
	return methods[`readUInt${bits}${isBigEndian ? "BE" : "LE"}`](input, offset);
}
function readBox(input, offset) {
	if (input.length - offset < 4) return;
	const boxSize = readUInt32BE(input, offset);
	if (input.length - offset < boxSize) return;
	return {
		name: toUTF8String(input, 4 + offset, 8 + offset),
		offset,
		size: boxSize
	};
}
function findBox(input, boxName, currentOffset) {
	while (currentOffset < input.length) {
		const box = readBox(input, currentOffset);
		if (!box) break;
		if (box.name === boxName) return box;
		currentOffset += box.size > 0 ? box.size : 8;
	}
}
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/bmp.js
var BMP = {
	validate: (input) => toUTF8String(input, 0, 2) === "BM",
	calculate: (input) => ({
		height: Math.abs(readInt32LE(input, 22)),
		width: readUInt32LE(input, 18)
	})
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/ico.js
var TYPE_ICON = 1;
var SIZE_HEADER$1 = 6;
var SIZE_IMAGE_ENTRY = 16;
function getSizeFromOffset(input, offset) {
	const value = input[offset];
	return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
	const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
	return {
		height: getSizeFromOffset(input, offset + 1),
		width: getSizeFromOffset(input, offset)
	};
}
var ICO = {
	validate(input) {
		const reserved = readUInt16LE(input, 0);
		const imageCount = readUInt16LE(input, 4);
		if (reserved !== 0 || imageCount === 0) return false;
		return readUInt16LE(input, 2) === TYPE_ICON;
	},
	calculate(input) {
		const nbImages = readUInt16LE(input, 4);
		const imageSize = getImageSize$1(input, 0);
		if (nbImages === 1) return imageSize;
		const images = [];
		for (let imageIndex = 0; imageIndex < nbImages; imageIndex += 1) images.push(getImageSize$1(input, imageIndex));
		return {
			width: imageSize.width,
			height: imageSize.height,
			images
		};
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/cur.js
var TYPE_CURSOR = 2;
var CUR = {
	validate(input) {
		const reserved = readUInt16LE(input, 0);
		const imageCount = readUInt16LE(input, 4);
		if (reserved !== 0 || imageCount === 0) return false;
		return readUInt16LE(input, 2) === TYPE_CURSOR;
	},
	calculate: (input) => ICO.calculate(input)
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/dds.js
var DDS = {
	validate: (input) => readUInt32LE(input, 0) === 542327876,
	calculate: (input) => ({
		height: readUInt32LE(input, 12),
		width: readUInt32LE(input, 16)
	})
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/gif.js
var gifRegexp = /^GIF8[79]a/;
var GIF = {
	validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
	calculate: (input) => ({
		height: readUInt16LE(input, 8),
		width: readUInt16LE(input, 6)
	})
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/heif.js
var brandMap = {
	avif: "avif",
	avis: "avif",
	mif1: "heif",
	msf1: "heif",
	heic: "heic",
	heix: "heic",
	hevc: "heic",
	hevx: "heic"
};
function detectType(input, start, end) {
	let hasAvif = false;
	let hasHeic = false;
	let hasHeif = false;
	for (let i = start; i <= end; i += 4) {
		const brand = toUTF8String(input, i, i + 4);
		if (brand === "avif" || brand === "avis") hasAvif = true;
		else if (brand === "heic" || brand === "heix" || brand === "hevc" || brand === "hevx") hasHeic = true;
		else if (brand === "mif1" || brand === "msf1") hasHeif = true;
	}
	if (hasAvif) return "avif";
	if (hasHeic) return "heic";
	if (hasHeif) return "heif";
}
var HEIF = {
	validate(input) {
		if (toUTF8String(input, 4, 8) !== "ftyp") return false;
		const ftypBox = findBox(input, "ftyp", 0);
		if (!ftypBox) return false;
		return toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12) in brandMap;
	},
	calculate(input) {
		const metaBox = findBox(input, "meta", 0);
		const iprpBox = metaBox && findBox(input, "iprp", metaBox.offset + 12);
		const ipcoBox = iprpBox && findBox(input, "ipco", iprpBox.offset + 8);
		if (!ipcoBox) throw new TypeError("Invalid HEIF, no ipco box found");
		const type = detectType(input, 8, metaBox.offset);
		const images = [];
		let currentOffset = ipcoBox.offset + 8;
		while (currentOffset < ipcoBox.offset + ipcoBox.size) {
			const ispeBox = findBox(input, "ispe", currentOffset);
			if (!ispeBox) break;
			const rawWidth = readUInt32BE(input, ispeBox.offset + 12);
			const rawHeight = readUInt32BE(input, ispeBox.offset + 16);
			const clapBox = findBox(input, "clap", currentOffset);
			let width = rawWidth;
			let height = rawHeight;
			if (clapBox && clapBox.offset < ipcoBox.offset + ipcoBox.size) width = rawWidth - readUInt32BE(input, clapBox.offset + 12);
			images.push({
				height,
				width
			});
			currentOffset = ispeBox.offset + ispeBox.size;
		}
		if (images.length === 0) throw new TypeError("Invalid HEIF, no sizes found");
		return {
			width: images[0].width,
			height: images[0].height,
			type,
			...images.length > 1 ? { images } : {}
		};
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/icns.js
var SIZE_HEADER = 8;
var FILE_LENGTH_OFFSET = 4;
var ENTRY_LENGTH_OFFSET = 4;
var ICON_TYPE_SIZE = {
	ICON: 32,
	"ICN#": 32,
	"icm#": 16,
	icm4: 16,
	icm8: 16,
	"ics#": 16,
	ics4: 16,
	ics8: 16,
	is32: 16,
	s8mk: 16,
	icp4: 16,
	icl4: 32,
	icl8: 32,
	il32: 32,
	l8mk: 32,
	icp5: 32,
	ic11: 32,
	ich4: 48,
	ich8: 48,
	ih32: 48,
	h8mk: 48,
	icp6: 64,
	ic12: 32,
	it32: 128,
	t8mk: 128,
	ic07: 128,
	ic08: 256,
	ic13: 256,
	ic09: 512,
	ic14: 512,
	ic10: 1024
};
function readImageHeader(input, imageOffset) {
	const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
	return [toUTF8String(input, imageOffset, imageLengthOffset), readUInt32BE(input, imageLengthOffset)];
}
function getImageSize(type) {
	const size = ICON_TYPE_SIZE[type];
	return {
		width: size,
		height: size,
		type
	};
}
var ICNS = {
	validate: (input) => toUTF8String(input, 0, 4) === "icns",
	calculate(input) {
		const inputLength = input.length;
		const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
		let imageOffset = SIZE_HEADER;
		const images = [];
		while (imageOffset < fileLength && imageOffset < inputLength) {
			const imageHeader = readImageHeader(input, imageOffset);
			const imageSize = getImageSize(imageHeader[0]);
			images.push(imageSize);
			imageOffset += imageHeader[1];
		}
		if (images.length === 0) throw new TypeError("Invalid ICNS, no sizes found");
		return {
			width: images[0].width,
			height: images[0].height,
			...images.length > 1 ? { images } : {}
		};
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/j2c.js
var J2C = {
	validate: (input) => readUInt32BE(input, 0) === 4283432785,
	calculate: (input) => ({
		height: readUInt32BE(input, 12),
		width: readUInt32BE(input, 8)
	})
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/jp2.js
var JP2 = {
	validate(input) {
		if (toUTF8String(input, 4, 8) !== "jP  ") return false;
		const ftypBox = findBox(input, "ftyp", 0);
		if (!ftypBox) return false;
		return toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12) === "jp2 ";
	},
	calculate(input) {
		const jp2hBox = findBox(input, "jp2h", 0);
		const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
		if (ihdrBox) return {
			height: readUInt32BE(input, ihdrBox.offset + 8),
			width: readUInt32BE(input, ihdrBox.offset + 12)
		};
		throw new TypeError("Unsupported JPEG 2000 format");
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/jpg.js
var EXIF_MARKER = "45786966";
var APP1_DATA_SIZE_BYTES = 2;
var EXIF_HEADER_BYTES = 6;
var BIG_ENDIAN_BYTE_ALIGN = "4d4d";
var LITTLE_ENDIAN_BYTE_ALIGN = "4949";
var IDF_ENTRY_BYTES = 12;
function isEXIF(input) {
	return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
	return {
		height: readUInt16BE(input, index),
		width: readUInt16BE(input, index + 2)
	};
}
function extractOrientation(exifBlock, isBigEndian) {
	const idfDirectoryEntries = readUInt(exifBlock, 16, 14, isBigEndian);
	for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
		const start = 16 + directoryEntryNumber * IDF_ENTRY_BYTES;
		const end = start + IDF_ENTRY_BYTES;
		if (start > exifBlock.length) return;
		const block = exifBlock.slice(start, end);
		if (readUInt(block, 16, 0, isBigEndian) === 274) {
			if (readUInt(block, 16, 2, isBigEndian) !== 3) return;
			if (readUInt(block, 32, 4, isBigEndian) !== 1) return;
			return readUInt(block, 16, 8, isBigEndian);
		}
	}
}
function validateExifBlock(input, index) {
	const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
	const byteAlign = toHexString(exifBlock, EXIF_HEADER_BYTES, 8);
	const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
	if (isBigEndian || byteAlign === LITTLE_ENDIAN_BYTE_ALIGN) return extractOrientation(exifBlock, isBigEndian);
}
function validateInput(input, index) {
	if (index > input.length) throw new TypeError("Corrupt JPG, exceeded buffer limits");
}
var JPG = {
	validate: (input) => toHexString(input, 0, 2) === "ffd8",
	calculate(_input) {
		let input = _input.slice(4);
		let orientation;
		let next;
		while (input.length) {
			const i = readUInt16BE(input, 0);
			validateInput(input, i);
			if (input[i] !== 255) {
				input = input.slice(1);
				continue;
			}
			if (isEXIF(input)) orientation = validateExifBlock(input, i);
			next = input[i + 1];
			if (next === 192 || next === 193 || next === 194) {
				const size = extractSize(input, i + 5);
				if (!orientation) return size;
				return {
					height: size.height,
					orientation,
					width: size.width
				};
			}
			input = input.slice(i + 2);
		}
		throw new TypeError("Invalid JPG, no size found");
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/utils/bit-reader.js
var BitReader = class {
	byteOffset = 2;
	bitOffset = 0;
	input;
	endianness;
	constructor(input, endianness) {
		this.input = input;
		this.endianness = endianness;
	}
	/** Reads a specified number of bits, and move the offset */
	getBits(length = 1) {
		let result = 0;
		let bitsRead = 0;
		while (bitsRead < length) {
			if (this.byteOffset >= this.input.length) throw new Error("Reached end of input");
			const currentByte = this.input[this.byteOffset];
			const bitsLeft = 8 - this.bitOffset;
			const bitsToRead = Math.min(length - bitsRead, bitsLeft);
			if (this.endianness === "little-endian") {
				const mask = (1 << bitsToRead) - 1;
				const bits = currentByte >> this.bitOffset & mask;
				result |= bits << bitsRead;
			} else {
				const bits = (currentByte & (1 << bitsToRead) - 1 << 8 - this.bitOffset - bitsToRead) >> 8 - this.bitOffset - bitsToRead;
				result = result << bitsToRead | bits;
			}
			bitsRead += bitsToRead;
			this.bitOffset += bitsToRead;
			if (this.bitOffset === 8) {
				this.byteOffset++;
				this.bitOffset = 0;
			}
		}
		return result;
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/jxl-stream.js
function calculateImageDimension(reader, isSmallImage) {
	if (isSmallImage) return 8 * (1 + reader.getBits(5));
	const extraBits = [
		9,
		13,
		18,
		30
	][reader.getBits(2)];
	return 1 + reader.getBits(extraBits);
}
function calculateImageWidth(reader, isSmallImage, widthMode, height) {
	if (isSmallImage && widthMode === 0) return 8 * (1 + reader.getBits(5));
	if (widthMode === 0) return calculateImageDimension(reader, false);
	return Math.floor(height * [
		1,
		1.2,
		4 / 3,
		1.5,
		16 / 9,
		5 / 4,
		2
	][widthMode - 1]);
}
var JXLStream = {
	validate: (input) => {
		return toHexString(input, 0, 2) === "ff0a";
	},
	calculate(input) {
		const reader = new BitReader(input, "little-endian");
		const isSmallImage = reader.getBits(1) === 1;
		const height = calculateImageDimension(reader, isSmallImage);
		return {
			width: calculateImageWidth(reader, isSmallImage, reader.getBits(3), height),
			height
		};
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/jxl.js
function extractCodestream(input) {
	const jxlcBox = findBox(input, "jxlc", 0);
	if (jxlcBox) return input.slice(jxlcBox.offset + 8, jxlcBox.offset + jxlcBox.size);
	const partialStreams = extractPartialStreams(input);
	if (partialStreams.length > 0) return concatenateCodestreams(partialStreams);
}
function extractPartialStreams(input) {
	const partialStreams = [];
	let offset = 0;
	while (offset < input.length) {
		const jxlpBox = findBox(input, "jxlp", offset);
		if (!jxlpBox) break;
		partialStreams.push(input.slice(jxlpBox.offset + 12, jxlpBox.offset + jxlpBox.size));
		offset = jxlpBox.offset + jxlpBox.size;
	}
	return partialStreams;
}
function concatenateCodestreams(partialCodestreams) {
	const totalLength = partialCodestreams.reduce((acc, curr) => acc + curr.length, 0);
	const codestream = new Uint8Array(totalLength);
	let position = 0;
	for (const partial of partialCodestreams) {
		codestream.set(partial, position);
		position += partial.length;
	}
	return codestream;
}
var JXL = {
	validate: (input) => {
		if (toUTF8String(input, 4, 8) !== "JXL ") return false;
		const ftypBox = findBox(input, "ftyp", 0);
		if (!ftypBox) return false;
		return toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12) === "jxl ";
	},
	calculate(input) {
		const codestream = extractCodestream(input);
		if (codestream) return JXLStream.calculate(codestream);
		throw new Error("No codestream found in JXL container");
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/ktx.js
var KTX = {
	validate: (input) => {
		const signature = toUTF8String(input, 1, 7);
		return ["KTX 11", "KTX 20"].includes(signature);
	},
	calculate: (input) => {
		const type = input[5] === 49 ? "ktx" : "ktx2";
		const offset = type === "ktx" ? 36 : 20;
		return {
			height: readUInt32LE(input, offset + 4),
			width: readUInt32LE(input, offset),
			type
		};
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/png.js
var pngSignature = "PNG\r\n\n";
var pngImageHeaderChunkName = "IHDR";
var pngFriedChunkName = "CgBI";
var PNG = {
	validate(input) {
		if (pngSignature === toUTF8String(input, 1, 8)) {
			let chunkName = toUTF8String(input, 12, 16);
			if (chunkName === pngFriedChunkName) chunkName = toUTF8String(input, 28, 32);
			if (chunkName !== pngImageHeaderChunkName) throw new TypeError("Invalid PNG");
			return true;
		}
		return false;
	},
	calculate(input) {
		if (toUTF8String(input, 12, 16) === pngFriedChunkName) return {
			height: readUInt32BE(input, 36),
			width: readUInt32BE(input, 32)
		};
		return {
			height: readUInt32BE(input, 20),
			width: readUInt32BE(input, 16)
		};
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/pnm.js
var PNMTypes = {
	P1: "pbm/ascii",
	P2: "pgm/ascii",
	P3: "ppm/ascii",
	P4: "pbm",
	P5: "pgm",
	P6: "ppm",
	P7: "pam",
	PF: "pfm"
};
var handlers = {
	default: (lines) => {
		let dimensions = [];
		while (lines.length > 0) {
			const line = lines.shift();
			if (line[0] === "#") continue;
			dimensions = line.split(" ");
			break;
		}
		if (dimensions.length === 2) return {
			height: Number.parseInt(dimensions[1], 10),
			width: Number.parseInt(dimensions[0], 10)
		};
		throw new TypeError("Invalid PNM");
	},
	pam: (lines) => {
		const size = {};
		while (lines.length > 0) {
			const line = lines.shift();
			if (line.length > 16 || line.charCodeAt(0) > 128) continue;
			const [key, value] = line.split(" ");
			if (key && value) size[key.toLowerCase()] = Number.parseInt(value, 10);
			if (size.height && size.width) break;
		}
		if (size.height && size.width) return {
			height: size.height,
			width: size.width
		};
		throw new TypeError("Invalid PAM");
	}
};
var PNM = {
	validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
	calculate(input) {
		const type = PNMTypes[toUTF8String(input, 0, 2)];
		const lines = toUTF8String(input, 3).split(/[\r\n]+/);
		return (handlers[type] || handlers.default)(lines);
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/psd.js
var PSD = {
	validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
	calculate: (input) => ({
		height: readUInt32BE(input, 14),
		width: readUInt32BE(input, 18)
	})
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/svg.js
var svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
var extractorRegExps = {
	height: /\sheight=(['"])([^%]+?)\1/,
	root: svgReg,
	viewbox: /\sviewBox=(['"])(.+?)\1/i,
	width: /\swidth=(['"])([^%]+?)\1/
};
var INCH_CM = 2.54;
var units = {
	in: 96,
	cm: 96 / INCH_CM,
	em: 16,
	ex: 8,
	m: 96 / INCH_CM * 100,
	mm: 96 / INCH_CM / 10,
	pc: 96 / 72 / 12,
	pt: 96 / 72,
	px: 1
};
var unitsReg = new RegExp(`^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`);
function parseLength(len) {
	const m = unitsReg.exec(len);
	if (!m) return;
	return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
	const bounds = viewbox.split(" ");
	return {
		height: parseLength(bounds[3]),
		width: parseLength(bounds[2])
	};
}
function parseAttributes(root) {
	const width = extractorRegExps.width.exec(root);
	const height = extractorRegExps.height.exec(root);
	const viewbox = extractorRegExps.viewbox.exec(root);
	return {
		height: height && parseLength(height[2]),
		viewbox: viewbox && parseViewbox(viewbox[2]),
		width: width && parseLength(width[2])
	};
}
function calculateByDimensions(attrs) {
	return {
		height: attrs.height,
		width: attrs.width
	};
}
function calculateByViewbox(attrs, viewbox) {
	const ratio = viewbox.width / viewbox.height;
	if (attrs.width) return {
		height: Math.floor(attrs.width / ratio),
		width: attrs.width
	};
	if (attrs.height) return {
		height: attrs.height,
		width: Math.floor(attrs.height * ratio)
	};
	return {
		height: viewbox.height,
		width: viewbox.width
	};
}
var SVG = {
	validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
	calculate(input) {
		const root = extractorRegExps.root.exec(toUTF8String(input));
		if (root) {
			const attrs = parseAttributes(root[0]);
			if (attrs.width != null && attrs.height != null) return calculateByDimensions(attrs);
			if (attrs.viewbox) return calculateByViewbox(attrs, attrs.viewbox);
		}
		throw new TypeError("Invalid SVG");
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/tga.js
var TGA = {
	validate(input) {
		return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
	},
	calculate(input) {
		return {
			height: readUInt16LE(input, 14),
			width: readUInt16LE(input, 12)
		};
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/tiff.js
var CONSTANTS = {
	TAG: {
		WIDTH: 256,
		HEIGHT: 257,
		COMPRESSION: 259
	},
	TYPE: {
		SHORT: 3,
		LONG: 4,
		LONG8: 16
	},
	ENTRY_SIZE: {
		STANDARD: 12,
		BIG: 20
	},
	COUNT_SIZE: {
		STANDARD: 2,
		BIG: 8
	}
};
function readIFD(input, { isBigEndian, isBigTiff }) {
	const ifdOffset = isBigTiff ? Number(readUInt64(input, 8, isBigEndian)) : readUInt(input, 32, 4, isBigEndian);
	const entryCountSize = isBigTiff ? CONSTANTS.COUNT_SIZE.BIG : CONSTANTS.COUNT_SIZE.STANDARD;
	return input.slice(ifdOffset + entryCountSize);
}
function readTagValue(input, type, offset, isBigEndian) {
	switch (type) {
		case CONSTANTS.TYPE.SHORT: return readUInt(input, 16, offset, isBigEndian);
		case CONSTANTS.TYPE.LONG: return readUInt(input, 32, offset, isBigEndian);
		case CONSTANTS.TYPE.LONG8: {
			const value = Number(readUInt64(input, offset, isBigEndian));
			if (value > Number.MAX_SAFE_INTEGER) throw new TypeError("Value too large");
			return value;
		}
		default: return 0;
	}
}
function nextTag(input, isBigTiff) {
	const entrySize = isBigTiff ? CONSTANTS.ENTRY_SIZE.BIG : CONSTANTS.ENTRY_SIZE.STANDARD;
	if (input.length > entrySize) return input.slice(entrySize);
}
function extractTags(input, { isBigEndian, isBigTiff }) {
	const tags = {};
	let temp = input;
	while (temp?.length) {
		const code = readUInt(temp, 16, 0, isBigEndian);
		const type = readUInt(temp, 16, 2, isBigEndian);
		const length = isBigTiff ? Number(readUInt64(temp, 4, isBigEndian)) : readUInt(temp, 32, 4, isBigEndian);
		if (code === 0) break;
		if (length === 1 && (type === CONSTANTS.TYPE.SHORT || type === CONSTANTS.TYPE.LONG || isBigTiff && type === CONSTANTS.TYPE.LONG8)) tags[code] = readTagValue(temp, type, isBigTiff ? 12 : 8, isBigEndian);
		temp = nextTag(temp, isBigTiff);
	}
	return tags;
}
function determineFormat(input) {
	const signature = toUTF8String(input, 0, 2);
	const version = readUInt(input, 16, 2, signature === "MM");
	return {
		isBigEndian: signature === "MM",
		isBigTiff: version === 43
	};
}
function validateBigTIFFHeader(input, isBigEndian) {
	const byteSize = readUInt(input, 16, 4, isBigEndian);
	const reserved = readUInt(input, 16, 6, isBigEndian);
	if (byteSize !== 8 || reserved !== 0) throw new TypeError("Invalid BigTIFF header");
}
var signatures = /* @__PURE__ */ new Set([
	"49492a00",
	"4d4d002a",
	"49492b00",
	"4d4d002b"
]);
var TIFF = {
	validate: (input) => {
		const signature = toHexString(input, 0, 4);
		return signatures.has(signature);
	},
	calculate(input) {
		const format = determineFormat(input);
		if (format.isBigTiff) validateBigTIFFHeader(input, format.isBigEndian);
		const tags = extractTags(readIFD(input, format), format);
		const info = {
			height: tags[CONSTANTS.TAG.HEIGHT],
			width: tags[CONSTANTS.TAG.WIDTH],
			type: format.isBigTiff ? "bigtiff" : "tiff"
		};
		if (tags[CONSTANTS.TAG.COMPRESSION]) info.compression = tags[CONSTANTS.TAG.COMPRESSION];
		if (!info.width || !info.height) throw new TypeError("Invalid Tiff. Missing tags");
		return info;
	}
};
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/webp.js
function calculateExtended(input) {
	return {
		height: 1 + readUInt24LE(input, 7),
		width: 1 + readUInt24LE(input, 4)
	};
}
function calculateLossless(input) {
	return {
		height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
		width: 1 + ((input[2] & 63) << 8 | input[1])
	};
}
function calculateLossy(input) {
	return {
		height: readInt16LE(input, 8) & 16383,
		width: readInt16LE(input, 6) & 16383
	};
}
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/types/index.js
var typeHandlers = /* @__PURE__ */ new Map([
	["bmp", BMP],
	["cur", CUR],
	["dds", DDS],
	["gif", GIF],
	["heif", HEIF],
	["icns", ICNS],
	["ico", ICO],
	["j2c", J2C],
	["jp2", JP2],
	["jpg", JPG],
	["jxl", JXL],
	["jxl-stream", JXLStream],
	["ktx", KTX],
	["png", PNG],
	["pnm", PNM],
	["psd", PSD],
	["svg", SVG],
	["tga", TGA],
	["tiff", TIFF],
	["webp", {
		validate(input) {
			const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
			const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
			const vp8Header = "VP8" === toUTF8String(input, 12, 15);
			return riffHeader && webpHeader && vp8Header;
		},
		calculate(_input) {
			const chunkHeader = toUTF8String(_input, 12, 16);
			const input = _input.slice(20, 30);
			if (chunkHeader === "VP8X") {
				const extendedHeader = input[0];
				const validStart = (extendedHeader & 192) === 0;
				const validEnd = (extendedHeader & 1) === 0;
				if (validStart && validEnd) return calculateExtended(input);
				throw new TypeError("Invalid WebP");
			}
			if (chunkHeader === "VP8 " && input[0] !== 47) return calculateLossy(input);
			const signature = toHexString(input, 3, 6);
			if (chunkHeader === "VP8L" && signature !== "9d012a") return calculateLossless(input);
			throw new TypeError("Invalid WebP");
		}
	}]
]);
var types = Array.from(typeHandlers.keys());
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/detector.js
var firstBytes = /* @__PURE__ */ new Map([
	[0, "heif"],
	[56, "psd"],
	[66, "bmp"],
	[68, "dds"],
	[71, "gif"],
	[73, "tiff"],
	[77, "tiff"],
	[82, "webp"],
	[105, "icns"],
	[137, "png"],
	[255, "jpg"]
]);
function detector(input) {
	const byte = input[0];
	const type = firstBytes.get(byte);
	if (type && typeHandlers.get(type).validate(input)) return type;
	return types.find((imageType) => typeHandlers.get(imageType).validate(input));
}
//#endregion
//#region node_modules/astro/dist/assets/utils/vendor/image-size/lookup.js
function lookup(input) {
	const type = detector(input);
	if (typeof type !== "undefined") {
		const size = typeHandlers.get(type).calculate(input);
		if (size !== void 0) {
			size.type = size.type ?? type;
			return size;
		}
	}
	throw new TypeError("unsupported file type: " + type);
}
//#endregion
//#region node_modules/astro/dist/assets/utils/metadata.js
async function imageMetadata(data, src) {
	let result;
	try {
		result = lookup(data);
	} catch {
		throw new AstroError({
			...NoImageMetadata,
			message: NoImageMetadata.message(src)
		});
	}
	if (result.height == null || result.width == null || !result.type) throw new AstroError({
		...NoImageMetadata,
		message: NoImageMetadata.message(src)
	});
	const { width, height, type, orientation } = result;
	const isPortrait = (orientation || 0) >= 5;
	return {
		width: isPortrait ? height : width,
		height: isPortrait ? width : height,
		format: type,
		orientation
	};
}
//#endregion
//#region node_modules/astro/dist/assets/utils/redirectValidation.js
async function fetchWithRedirects(options) {
	const { url, headers, imageConfig, fetchFn = globalThis.fetch, redirectLimit = 10, onMaxRedirectsExceeded = (_u) => /* @__PURE__ */ new Error("Maximum redirect depth exceeded"), onMissingLocationHeader = (_s, _u) => /* @__PURE__ */ new Error(`Redirect response ${_s} missing Location header`), onDisallowedRedirect = (_current, _target) => /* @__PURE__ */ new Error(`The image at ${_current} redirected to ${_target}, which is not an allowed remote location.`) } = options;
	if (redirectLimit <= 0) throw onMaxRedirectsExceeded(typeof url === "string" ? url : url.toString());
	const urlString = typeof url === "string" ? url : url.toString();
	const res = await fetchFn(new Request(url, { headers }), { redirect: "manual" });
	if ([
		301,
		302,
		303,
		307,
		308
	].includes(res.status)) {
		const location = res.headers.get("Location");
		if (!location) throw onMissingLocationHeader(res.status, urlString);
		const redirectUrl = new URL(location, urlString).toString();
		if (!isRemoteAllowed(redirectUrl, {
			domains: imageConfig.domains ?? [],
			remotePatterns: imageConfig.remotePatterns ?? []
		})) throw onDisallowedRedirect(urlString, redirectUrl);
		return fetchWithRedirects({
			url: redirectUrl,
			headers,
			imageConfig,
			fetchFn,
			redirectLimit: redirectLimit - 1,
			onMaxRedirectsExceeded,
			onMissingLocationHeader,
			onDisallowedRedirect
		});
	}
	return res;
}
//#endregion
//#region node_modules/astro/dist/assets/utils/remoteProbe.js
async function inferRemoteSize$1(url, imageConfig) {
	if (!URL.canParse(url)) throw new AstroError({
		...FailedToFetchRemoteImageDimensions,
		message: FailedToFetchRemoteImageDimensions.message(url)
	});
	const allowlistConfig = imageConfig ? {
		domains: imageConfig.domains ?? [],
		remotePatterns: imageConfig.remotePatterns ?? []
	} : void 0;
	if (!allowlistConfig) {
		const parsedUrl = new URL(url);
		if (!["http:", "https:"].includes(parsedUrl.protocol)) throw new AstroError({
			...FailedToFetchRemoteImageDimensions,
			message: FailedToFetchRemoteImageDimensions.message(url)
		});
	}
	if (allowlistConfig && !isRemoteAllowed(url, allowlistConfig)) throw new AstroError({
		...RemoteImageNotAllowed,
		message: RemoteImageNotAllowed.message(url)
	});
	let response;
	try {
		response = await fetchWithRedirects({
			url,
			onMaxRedirectsExceeded: (u) => new AstroError({
				...FailedToFetchRemoteImageDimensions,
				message: FailedToFetchRemoteImageDimensions.message(u)
			}),
			onMissingLocationHeader: (_status, u) => new AstroError({
				...FailedToFetchRemoteImageDimensions,
				message: FailedToFetchRemoteImageDimensions.message(u)
			}),
			imageConfig: imageConfig ?? {
				remotePatterns: [],
				domains: []
			}
		});
	} catch (_err) {
		throw new AstroError({
			...FailedToFetchRemoteImageDimensions,
			message: FailedToFetchRemoteImageDimensions.message(url)
		});
	}
	if (allowlistConfig && !isRemoteAllowed(response.url, allowlistConfig)) throw new AstroError({
		...RemoteImageNotAllowed,
		message: RemoteImageNotAllowed.message(url)
	});
	if (!response.body || !response.ok) throw new AstroError({
		...FailedToFetchRemoteImageDimensions,
		message: FailedToFetchRemoteImageDimensions.message(url)
	});
	const reader = response.body.getReader();
	let done, value;
	let accumulatedChunks = /* @__PURE__ */ new Uint8Array();
	while (!done) {
		const readResult = await reader.read();
		done = readResult.done;
		if (done) break;
		if (readResult.value) {
			value = readResult.value;
			let tmp = new Uint8Array(accumulatedChunks.length + value.length);
			tmp.set(accumulatedChunks, 0);
			tmp.set(value, accumulatedChunks.length);
			accumulatedChunks = tmp;
			try {
				const dimensions = await imageMetadata(accumulatedChunks, url);
				if (dimensions) {
					await reader.cancel();
					return dimensions;
				}
			} catch {}
		}
	}
	throw new AstroError({
		...NoImageMetadata,
		message: NoImageMetadata.message(url)
	});
}
//#endregion
//#region node_modules/astro/dist/assets/services/service.js
function isLocalService(service) {
	if (!service) return false;
	return "transform" in service;
}
function parseQuality(quality) {
	let result = Number.parseInt(quality);
	if (Number.isNaN(result)) return quality;
	return result;
}
var sortNumeric = (a, b) => a - b;
function verifyOptions(options) {
	if (!options.src || !isRemoteImage(options.src) && !isESMImportedImage(options.src)) throw new AstroError({
		...ExpectedImage,
		message: ExpectedImage.message(JSON.stringify(options.src), typeof options.src, JSON.stringify(options, (_, v) => v === void 0 ? null : v))
	});
	if (!isESMImportedImage(options.src)) {
		if (options.src.startsWith("/@fs/") || !isRemotePath(options.src) && !options.src.startsWith("/")) throw new AstroError({
			...LocalImageUsedWrongly,
			message: LocalImageUsedWrongly.message(options.src)
		});
		let missingDimension;
		if (!options.width && !options.height) missingDimension = "both";
		else if (!options.width && options.height) missingDimension = "width";
		else if (options.width && !options.height) missingDimension = "height";
		if (missingDimension) throw new AstroError({
			...MissingImageDimension,
			message: MissingImageDimension.message(missingDimension, options.src)
		});
	} else {
		if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) throw new AstroError({
			...UnsupportedImageFormat,
			message: UnsupportedImageFormat.message(options.src.format, options.src.src, VALID_SUPPORTED_FORMATS)
		});
		if (options.widths && options.densities) throw new AstroError(IncompatibleDescriptorOptions);
		if (options.src.format !== "svg" && options.format === "svg") throw new AstroError(UnsupportedImageConversion);
	}
}
var baseService = {
	propertiesToHash: DEFAULT_HASH_PROPS,
	validateOptions(options) {
		verifyOptions(options);
		if (!options.format) if (isESMImportedImage(options.src)) options.format = resolveDefaultOutputFormat(options.src.format);
		else {
			const inferred = inferSourceFormat(options.src);
			if (inferred) options.format = resolveDefaultOutputFormat(inferred);
		}
		if (options.width) options.width = Math.round(options.width);
		if (options.height) options.height = Math.round(options.height);
		if (options.layout) delete options.layout;
		if (options.fit === "none") delete options.fit;
		return options;
	},
	getHTMLAttributes(options) {
		const { targetWidth, targetHeight } = getTargetDimensions(options);
		const { src, width, height, format, quality, densities, widths, formats, layout, priority, fit, position, background, ...attributes } = options;
		return {
			...attributes,
			width: targetWidth,
			height: targetHeight,
			loading: attributes.loading ?? "lazy",
			decoding: attributes.decoding ?? "async"
		};
	},
	getSrcSet(options) {
		const { targetWidth, targetHeight } = getTargetDimensions(options);
		const aspectRatio = targetWidth / targetHeight;
		const { widths, densities } = options;
		const targetFormat = options.format;
		let transformedWidths = (widths ?? []).sort(sortNumeric);
		let imageWidth = options.width;
		let maxWidth = Number.POSITIVE_INFINITY;
		if (isESMImportedImage(options.src)) {
			imageWidth = options.src.width;
			maxWidth = imageWidth;
			if (transformedWidths.length > 0 && transformedWidths.at(-1) > maxWidth) {
				transformedWidths = transformedWidths.filter((width) => width <= maxWidth);
				transformedWidths.push(maxWidth);
			}
		}
		transformedWidths = Array.from(new Set(transformedWidths));
		const { width: transformWidth, height: transformHeight, ...transformWithoutDimensions } = options;
		let allWidths = [];
		if (densities) {
			const densityValues = densities.map((density) => {
				if (typeof density === "number") return density;
				else return Number.parseFloat(density);
			});
			allWidths = densityValues.sort(sortNumeric).map((density) => Math.round(targetWidth * density)).map((width, index) => ({
				width,
				descriptor: `${densityValues[index]}x`
			}));
		} else if (transformedWidths.length > 0) allWidths = transformedWidths.map((width) => ({
			width,
			descriptor: `${width}w`
		}));
		return allWidths.map(({ width, descriptor }) => {
			const height = Math.round(width / aspectRatio);
			return {
				transform: {
					...transformWithoutDimensions,
					width,
					height
				},
				descriptor,
				attributes: targetFormat ? { type: `image/${targetFormat}` } : {}
			};
		});
	},
	getURL(options, imageConfig) {
		const searchParams = new URLSearchParams();
		if (isESMImportedImage(options.src)) searchParams.append("href", options.src.src);
		else if (isRemoteAllowed(options.src, imageConfig)) searchParams.append("href", options.src);
		else return options.src;
		Object.entries({
			w: "width",
			h: "height",
			q: "quality",
			f: "format",
			fit: "fit",
			position: "position",
			background: "background"
		}).forEach(([param, key]) => {
			options[key] && searchParams.append(param, options[key].toString());
		});
		let url = `${joinPaths("/", imageConfig.endpoint.route)}?${searchParams}`;
		if (imageConfig.assetQueryParams) {
			const assetQueryString = imageConfig.assetQueryParams.toString();
			if (assetQueryString) url += "&" + assetQueryString;
		}
		return url;
	},
	parseURL(url) {
		const params = url.searchParams;
		if (!params.has("href")) return;
		return {
			src: params.get("href"),
			width: params.has("w") ? Number.parseInt(params.get("w")) : void 0,
			height: params.has("h") ? Number.parseInt(params.get("h")) : void 0,
			format: params.has("f") ? params.get("f") : void 0,
			quality: params.get("q"),
			fit: params.get("fit"),
			position: params.get("position") ?? void 0,
			background: params.get("background") ?? void 0
		};
	},
	getRemoteSize(url, imageConfig) {
		return inferRemoteSize$1(url, imageConfig);
	}
};
function getTargetDimensions(options) {
	let targetWidth = options.width;
	let targetHeight = options.height;
	if (isESMImportedImage(options.src)) {
		const aspectRatio = options.src.width / options.src.height;
		if (targetHeight && !targetWidth) targetWidth = Math.round(targetHeight * aspectRatio);
		else if (targetWidth && !targetHeight) targetHeight = Math.round(targetWidth / aspectRatio);
		else if (!targetWidth && !targetHeight) {
			targetWidth = options.src.width;
			targetHeight = options.src.height;
		}
	}
	return {
		targetWidth,
		targetHeight
	};
}
//#endregion
//#region node_modules/astro/dist/assets/types.js
function isImageMetadata(src) {
	return src.fsPath && !("fsPath" in src);
}
//#endregion
//#region node_modules/astro/dist/assets/utils/url.js
var PLACEHOLDER_BASE = "astro://placeholder";
function createPlaceholderURL(pathOrUrl) {
	return new URL(pathOrUrl, PLACEHOLDER_BASE);
}
function stringifyPlaceholderURL(url) {
	return url.href.replace(PLACEHOLDER_BASE, "");
}
//#endregion
//#region node_modules/astro/dist/assets/internal.js
var cssFitValues = [
	"fill",
	"contain",
	"cover",
	"scale-down"
];
async function getConfiguredImageService() {
	if (!globalThis?.astroAsset?.imageService) {
		const { default: service } = await import("./sharp_Dz_BT8t8.mjs").catch((e) => {
			const error = new AstroError(InvalidImageService);
			error.cause = e;
			throw error;
		});
		if (!globalThis.astroAsset) globalThis.astroAsset = {};
		globalThis.astroAsset.imageService = service;
		return service;
	}
	return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
	if (!options || typeof options !== "object") throw new AstroError({
		...ExpectedImageOptions,
		message: ExpectedImageOptions.message(JSON.stringify(options))
	});
	if (typeof options.src === "undefined") throw new AstroError({
		...ExpectedImage,
		message: ExpectedImage.message(options.src, "undefined", JSON.stringify(options))
	});
	if (isImageMetadata(options)) throw new AstroError(ExpectedNotESMImage);
	const service = await getConfiguredImageService();
	const resolvedOptions = {
		...options,
		src: await resolveSrc(options.src)
	};
	let originalWidth;
	let originalHeight;
	if (resolvedOptions.inferSize) {
		delete resolvedOptions.inferSize;
		if (isRemoteImage(resolvedOptions.src) && isRemotePath(resolvedOptions.src)) {
			if (!isRemoteAllowed(resolvedOptions.src, imageConfig)) throw new AstroError({
				...RemoteImageNotAllowed,
				message: RemoteImageNotAllowed.message(resolvedOptions.src)
			});
			const getRemoteSize = (url) => service.getRemoteSize?.(url, imageConfig) ?? inferRemoteSize$1(url, imageConfig);
			const result = await getRemoteSize(resolvedOptions.src);
			resolvedOptions.width ??= result.width;
			resolvedOptions.height ??= result.height;
			if (result.format) resolvedOptions.format ??= resolveDefaultOutputFormat(result.format);
			originalWidth = result.width;
			originalHeight = result.height;
		}
	}
	const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
	const clonedSrc = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.clone ?? resolvedOptions.src : resolvedOptions.src;
	if (isESMImportedImage(clonedSrc)) {
		originalWidth = clonedSrc.width;
		originalHeight = clonedSrc.height;
	}
	if (originalWidth && originalHeight) {
		const aspectRatio = originalWidth / originalHeight;
		if (resolvedOptions.height && !resolvedOptions.width) resolvedOptions.width = Math.round(resolvedOptions.height * aspectRatio);
		else if (resolvedOptions.width && !resolvedOptions.height) resolvedOptions.height = Math.round(resolvedOptions.width / aspectRatio);
		else if (!resolvedOptions.width && !resolvedOptions.height) {
			resolvedOptions.width = originalWidth;
			resolvedOptions.height = originalHeight;
		}
	}
	resolvedOptions.src = clonedSrc;
	const layout = options.layout ?? imageConfig.layout ?? "none";
	if (resolvedOptions.priority) {
		resolvedOptions.loading ??= "eager";
		resolvedOptions.decoding ??= "sync";
		resolvedOptions.fetchpriority ??= "high";
		delete resolvedOptions.priority;
	} else {
		resolvedOptions.loading ??= "lazy";
		resolvedOptions.decoding ??= "async";
		resolvedOptions.fetchpriority ??= void 0;
	}
	if (layout !== "none") {
		resolvedOptions.widths ||= getWidths({
			width: resolvedOptions.width,
			layout,
			originalWidth,
			breakpoints: imageConfig.breakpoints?.length ? imageConfig.breakpoints : isLocalService(service) ? LIMITED_RESOLUTIONS : DEFAULT_RESOLUTIONS
		});
		resolvedOptions.sizes ||= getSizesAttribute({
			width: resolvedOptions.width,
			layout
		});
		delete resolvedOptions.densities;
		resolvedOptions["data-astro-image"] = layout;
		if (resolvedOptions.fit && cssFitValues.includes(resolvedOptions.fit)) resolvedOptions["data-astro-image-fit"] = resolvedOptions.fit;
		resolvedOptions["data-astro-image-pos"] = (resolvedOptions.position || "center").replace(/\s+/g, "-");
	}
	const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
	validatedOptions.format ??= await peekRemoteFormatForStaticEmit(validatedOptions, imageConfig, service);
	const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
	const lazyImageURLFactory = (getValue) => {
		let cached = null;
		return () => cached ??= getValue();
	};
	const initialImageURL = await service.getURL(validatedOptions, imageConfig);
	let lazyImageURL = lazyImageURLFactory(() => initialImageURL);
	const matchesValidatedTransform = (transform) => transform.width === validatedOptions.width && transform.height === validatedOptions.height && transform.format === validatedOptions.format;
	let srcSets = await Promise.all(srcSetTransforms.map(async (srcSet) => {
		return {
			transform: srcSet.transform,
			url: matchesValidatedTransform(srcSet.transform) ? initialImageURL : await service.getURL(srcSet.transform, imageConfig),
			descriptor: srcSet.descriptor,
			attributes: srcSet.attributes
		};
	}));
	if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && initialImageURL === validatedOptions.src)) {
		const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
		lazyImageURL = lazyImageURLFactory(() => globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalFilePath));
		srcSets = srcSetTransforms.map((srcSet) => {
			return {
				transform: srcSet.transform,
				url: matchesValidatedTransform(srcSet.transform) ? lazyImageURL() : globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
				descriptor: srcSet.descriptor,
				attributes: srcSet.attributes
			};
		});
	} else if (imageConfig.assetQueryParams) {
		const imageURLObj = createPlaceholderURL(initialImageURL);
		imageConfig.assetQueryParams.forEach((value, key) => {
			imageURLObj.searchParams.set(key, value);
		});
		lazyImageURL = lazyImageURLFactory(() => stringifyPlaceholderURL(imageURLObj));
		srcSets = srcSets.map((srcSet) => {
			const urlObj = createPlaceholderURL(srcSet.url);
			imageConfig.assetQueryParams.forEach((value, key) => {
				urlObj.searchParams.set(key, value);
			});
			return {
				...srcSet,
				url: stringifyPlaceholderURL(urlObj)
			};
		});
	}
	return {
		rawOptions: resolvedOptions,
		options: validatedOptions,
		get src() {
			return lazyImageURL();
		},
		srcSet: {
			values: srcSets,
			attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
		},
		attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
	};
}
async function peekRemoteFormatForStaticEmit(options, imageConfig, service) {
	if (!isRemoteImage(options.src) || !isRemoteAllowed(options.src, imageConfig) || !globalThis.astroAsset?.addStaticImage || !isLocalService(service) || !service.getRemoteSize) return;
	try {
		return resolveDefaultOutputFormat((await service.getRemoteSize(options.src, imageConfig)).format);
	} catch {
		return;
	}
}
Function.prototype.toString.call(Object);
//#endregion
//#region node_modules/astro/components/Image.astro
createAstro("https://ecollifen.cl");
var $$Image = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Image;
	const props = Astro2.props;
	if (props.alt === void 0 || props.alt === null) throw new AstroError(ImageMissingAlt);
	if (typeof props.width === "string") props.width = Number.parseInt(props.width);
	if (typeof props.height === "string") props.height = Number.parseInt(props.height);
	if ((props.layout ?? imageConfig.layout ?? "none") !== "none") {
		props.layout ??= imageConfig.layout;
		props.fit ??= imageConfig.objectFit ?? "cover";
		props.position ??= imageConfig.objectPosition ?? "center";
	} else if (imageConfig.objectFit || imageConfig.objectPosition) {
		props.fit ??= imageConfig.objectFit;
		props.position ??= imageConfig.objectPosition;
	}
	const image = await getImage(props);
	const additionalAttributes = {};
	if (image.srcSet.values.length > 0) additionalAttributes.srcset = image.srcSet.attribute;
	const { class: className, ...attributes } = {
		...additionalAttributes,
		...image.attributes
	};
	return renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(image.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}>`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/node_modules/astro/components/Image.astro", void 0);
//#endregion
//#region node_modules/astro/components/Picture.astro
createAstro("https://ecollifen.cl");
var $$Picture = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Picture;
	const defaultFormats = ["webp"];
	const defaultFallbackFormat = "png";
	const specialFormatsFallback = [
		"gif",
		"svg",
		"jpg",
		"jpeg"
	];
	const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
	if (props.alt === void 0 || props.alt === null) throw new AstroError(ImageMissingAlt);
	const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
	if (scopedStyleClass) if (pictureAttributes.class) pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
	else pictureAttributes.class = scopedStyleClass;
	const useResponsive = (props.layout ?? imageConfig.layout ?? "none") !== "none";
	if (useResponsive) {
		props.layout ??= imageConfig.layout;
		props.fit ??= imageConfig.objectFit ?? "cover";
		props.position ??= imageConfig.objectPosition ?? "center";
	} else if (imageConfig.objectFit || imageConfig.objectPosition) {
		props.fit ??= imageConfig.objectFit;
		props.position ??= imageConfig.objectPosition;
	}
	for (const key in props) if (key.startsWith("data-astro-cid")) pictureAttributes[key] = props[key];
	const originalSrc = await resolveSrc(props.src);
	if (props.inferSize && isRemoteImage(originalSrc)) {
		const remoteSize = await inferRemoteSize(originalSrc);
		delete props.inferSize;
		props.width ??= remoteSize.width;
		props.height ??= remoteSize.height;
	}
	const optimizedImages = await Promise.all(formats.map(async (format) => await getImage({
		...props,
		src: originalSrc,
		format,
		widths: props.widths,
		densities: props.densities
	})));
	const clonedSrc = isESMImportedImage(originalSrc) ? originalSrc.clone ?? originalSrc : originalSrc;
	let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
	if (!fallbackFormat && isESMImportedImage(clonedSrc) && specialFormatsFallback.includes(clonedSrc.format)) resultFallbackFormat = clonedSrc.format;
	const fallbackImage = await getImage({
		...props,
		format: resultFallbackFormat,
		widths: props.widths,
		densities: props.densities
	});
	const imgAdditionalAttributes = {};
	const sourceAdditionalAttributes = {};
	if (props.sizes) sourceAdditionalAttributes.sizes = props.sizes;
	if (fallbackImage.srcSet.values.length > 0) imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
	const { class: className, ...attributes } = {
		...imgAdditionalAttributes,
		...fallbackImage.attributes
	};
	return renderTemplate`${maybeRenderHead($$result)}<picture${spreadAttributes(pictureAttributes)}>${Object.entries(optimizedImages).map(([_, image]) => {
		return renderTemplate`<source${addAttribute(props.densities || !props.densities && !props.widths && !useResponsive ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute, "srcset")}${addAttribute(mime.lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
	})}<img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}></picture>`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/node_modules/astro/components/Picture.astro", void 0);
//#endregion
//#region \0virtual:astro:assets/fonts/internal
var componentDataByCssVariable = /* @__PURE__ */ new Map([]);
//#endregion
//#region node_modules/astro/dist/assets/fonts/core/filter-preloads.js
function filterPreloads(data, preload) {
	if (!preload) return null;
	if (preload === true) return data;
	return data.filter(({ weight, style, subset }) => preload.some((p) => {
		if (p.weight !== void 0 && weight !== void 0 && !checkWeight(p.weight.toString(), weight)) return false;
		if (p.style !== void 0 && p.style !== style) return false;
		if (p.subset !== void 0 && p.subset !== subset) return false;
		return true;
	}));
}
function checkWeight(input, target) {
	const trimmedInput = input.trim();
	if (trimmedInput.includes(" ")) return trimmedInput === target;
	if (target.includes(" ")) {
		const [a, b] = target.split(" ");
		const parsedInput = Number.parseInt(input);
		return parsedInput >= Number.parseInt(a) && parsedInput <= Number.parseInt(b);
	}
	return input === target;
}
//#endregion
//#region node_modules/astro/components/Font.astro
createAstro("https://ecollifen.cl");
var $$Font = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Font;
	const { cssVariable, preload = false } = Astro.props;
	const data = componentDataByCssVariable.get(cssVariable);
	if (!data) throw new AstroError({
		...FontFamilyNotFound,
		message: FontFamilyNotFound.message(cssVariable)
	});
	const filteredPreloadData = filterPreloads(data.preloads, preload);
	return renderTemplate`<style>${unescapeHTML(data.css)}</style>${filteredPreloadData?.map(({ url, type }) => renderTemplate`<link rel="preload"${addAttribute(url, "href")} as="font"${addAttribute(`font/${type}`, "type")} crossorigin>`)}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/node_modules/astro/components/Font.astro", void 0);
//#endregion
//#region node_modules/astro/dist/assets/fonts/infra/remote-runtime-font-file-url-resolver.js
var RemoteRuntimeFontFileUrlResolver = class {
	#urls;
	#address;
	constructor({ urls, address }) {
		this.#urls = urls;
		this.#address = address;
	}
	resolve(url) {
		if (!this.#urls.has(url)) return null;
		if (!this.#address) throw new Error("Server address unavailable, this should not happen. Open an issue.");
		if (!url.startsWith("/")) url = new URL(url).pathname;
		return `http://${this.#address.family === "IPv6" ? `[${this.#address.address}]` : this.#address.address}:${this.#address.port}${url}`;
	}
};
new RemoteRuntimeFontFileUrlResolver({
	urls: /* @__PURE__ */ new Set([]),
	address: null
});
(function() {
	const regexes = [
		/^(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.{1,2}(?:\/|$)).)*?)\/)\.env)$/i,
		/^(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.{1,2}(?:\/|$)).)*?)\/)\.env\.[^/]*?\/?)$/i,
		/^(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.{1,2}(?:\/|$)).)*?)\/)(?!\.{1,2}(?:\/|$))(?=.)[^/]*?\.(crt|pem|key|p12|pfx|cer|der))$/i,
		/^(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.{1,2}(?:\/|$)).)*?)\/)\.npmrc)$/i,
		/^(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.{1,2}(?:\/|$)).)*?)\/)\.yarnrc\.yml)$/i,
		/^(?:(?:^|\/|(?:(?:(?!(?:^|\/)\.{1,2}(?:\/|$)).)*?)\/)\.git(?:\/(?!\.{1,2}(?:\/|$))(?:(?:(?!(?:^|\/)\.{1,2}(?:\/|$)).)*?)|$))$/i
	];
	return function fsDenyGlob(testPath) {
		return regexes.some((re) => re.test(testPath));
	};
})();
var assetQueryParams = void 0;
var imageConfig = {
	"endpoint": { "route": "/_image" },
	"service": {
		"entrypoint": "astro/assets/services/sharp",
		"config": {}
	},
	"dangerouslyProcessSVG": false,
	"domains": ["ecollifen.cl", "ecollifen.local"],
	"remotePatterns": [],
	"responsiveStyles": false
};
Object.defineProperty(imageConfig, "assetQueryParams", {
	value: assetQueryParams,
	enumerable: false,
	configurable: true
});
var inferRemoteSize = async (url) => {
	return (await getConfiguredImageService()).getRemoteSize?.(url, imageConfig) ?? inferRemoteSize$1(url, imageConfig);
};
var getImage = async (options) => await getImage$1(options, imageConfig);
//#endregion
//#region src/lib/navigation.ts
var navigation = [
	{
		name: "Inicio",
		href: "/"
	},
	{
		name: "Tienda",
		href: "/tienda"
	},
	{
		name: "Servicio Técnico",
		href: "/servicio-tecnico"
	},
	{
		name: "Nosotros",
		href: "/nosotros"
	},
	{
		name: "Contacto",
		href: "/contacto"
	}
];
//#endregion
//#region src/components/layout/MainNav.astro
createAstro("https://ecollifen.cl");
var $$MainNav = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MainNav;
	const { class: className } = Astro.props;
	const ruta = Astro.url.pathname;
	const esActivo = (href) => href !== "/" && ruta.startsWith(href);
	return renderTemplate`${maybeRenderHead($$result)}<nav${addAttribute(["flex items-center gap-5.5", className], "class:list")}>${navigation.map((item) => renderTemplate`<a${addAttribute(["text-sm whitespace-nowrap transition-colors hover:text-green-300", esActivo(item.href) ? "font-bold text-green-300" : "font-medium"], "class:list")}${addAttribute(esActivo(item.href) ? "page" : void 0, "aria-current")}${addAttribute(item.href, "href")}>${item.name}</a>`)}</nav>`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/layout/MainNav.astro", void 0);
//#endregion
//#region src/assets/ecollifenLogo.png
var ecollifenLogo_default = new Proxy({
	"src": "/_astro/ecollifenLogo.D7xMehZf.png",
	"width": 3141,
	"height": 3111,
	"format": "png"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/ecollifenLogo.png";
	if (target[name] !== void 0 && globalThis.astroAsset) globalThis.astroAsset?.referencedImages?.add("C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/assets/ecollifenLogo.png");
	return target[name];
} });
//#endregion
//#region node_modules/@nanostores/preact/index.js
function useStore(store, { keys, ssr } = {}) {
	let [isHydrated, setIsHydrated] = useState(false);
	let [, forceRender] = useState({});
	let [valueBeforeEffect] = useState(store.get());
	useEffect(() => {
		if (ssr) setIsHydrated(true);
		if (valueBeforeEffect !== store.get()) forceRender({});
	}, []);
	useEffect(() => {
		let batching, timer, unlisten;
		let rerender = () => {
			if (!batching) {
				batching = 1;
				timer = setTimeout(() => {
					batching = void 0;
					forceRender({});
				});
			}
		};
		if (keys) unlisten = listenKeys(store, keys, rerender);
		else unlisten = store.listen(rerender);
		return () => {
			unlisten();
			clearTimeout(timer);
		};
	}, [store, "" + keys]);
	if (ssr && !isHydrated) return ssr === "initial" ? store.init : ssr();
	return store.get();
}
var cartStore = atom({
	items: [],
	count: 0,
	total: 0,
	currency: "CLP"
});
var cartOpen = atom(false);
var BASE = `undefined/wp-json/wc/store/v1`;
var TOKEN_KEY = "woo-cart-token";
var nonce = null;
function getToken() {
	try {
		return localStorage.getItem(TOKEN_KEY);
	} catch {
		return null;
	}
}
function saveHeaders(res) {
	const token = res.headers.get("Cart-Token");
	if (token) try {
		localStorage.setItem(TOKEN_KEY, token);
	} catch {}
	const fresco = res.headers.get("Nonce");
	if (fresco) nonce = fresco;
}
async function refrescarNonce() {
	try {
		saveHeaders(await fetch(`${BASE}/cart`, { headers: { "Content-Type": "application/json" } }));
	} catch (error) {
		console.error("[cart] No se pudo renovar el nonce:", error);
	}
}
function esCrossOrigin() {
	try {
		return new URL(BASE).origin !== window.location.origin;
	} catch {
		return true;
	}
}
async function request(path, init = {}, reintento = false) {
	const token = getToken();
	const enviarToken = token && esCrossOrigin();
	const res = await fetch(`${BASE}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...enviarToken ? { "Cart-Token": token } : {},
			...nonce ? { "Nonce": nonce } : {},
			...init.headers
		}
	});
	saveHeaders(res);
	if (res.status === 401 && !reintento) {
		await refrescarNonce();
		return request(path, init, true);
	}
	if (!res.ok) throw new Error(`Store API ${res.status} en ${path}`);
	return res.json();
}
function toMajor(value, minor) {
	return Number(value) / 10 ** minor;
}
function normaliza(raw) {
	const minor = raw?.totals?.currency_minor_unit ?? 0;
	const items = (raw?.items ?? []).map((i) => ({
		key: i.key,
		id: i.id,
		name: i.name,
		quantity: i.quantity,
		lineTotal: toMajor(i.totals?.line_total ?? "0", minor),
		image: i.images?.[0]?.thumbnail ?? i.images?.[0]?.src ?? null
	}));
	return {
		items,
		count: raw?.items_count ?? items.reduce((n, i) => n + i.quantity, 0),
		total: toMajor(raw?.totals?.total_price ?? "0", minor),
		currency: raw?.totals?.currency_code ?? "CLP"
	};
}
async function loadCart() {
	try {
		cartStore.set(normaliza(await request("/cart")));
	} catch (error) {
		console.error("[cart] No se pudo cargar el carrito:", error);
	}
}
async function removeFromCart(key) {
	const raw = await request("/cart/remove-item", {
		method: "POST",
		body: JSON.stringify({ key })
	});
	cartStore.set(normaliza(raw));
}
async function updateQuantity(key, quantity) {
	const raw = await request("/cart/update-item", {
		method: "POST",
		body: JSON.stringify({
			key,
			quantity
		})
	});
	cartStore.set(normaliza(raw));
}
function formatMoney(value, currency = "CLP") {
	return new Intl.NumberFormat("es-CL", {
		style: "currency",
		currency,
		maximumFractionDigits: 0
	}).format(value);
}
//#endregion
//#region src/components/cart/CartBadge.tsx
function CartBadge() {
	const cart = useStore(cartStore);
	useEffect(() => {
		loadCart();
	}, []);
	if (cart.count <= 0) return null;
	return jsx("span", {
		class: "absolute top-1 left-6 flex h-4 min-w-4 items-center justify-center rounded-full bg-cta px-1 text-[10px] font-bold text-cta-contrast",
		children: cart.count
	});
}
//#endregion
//#region src/lib/contacto.ts
var whatsapp = void 0;
var MENSAJE_ASESORIA = "Hola, quiero asesoría para elegir mis productos.";
var MENSAJE_SERVICIO = "Hola, necesito servicio técnico para mi maquinaria.";
function asesoriaHref(mensaje = MENSAJE_ASESORIA) {
	return "/contacto";
}
var hayWhatsApp = Boolean(whatsapp);
//#endregion
//#region src/components/layout/Header.astro
var $$Header = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<header class="w-full"><div class="bg-green-950 text-green-100"><div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-2 text-xs"><p class="font-mono">Soluciones que echan raíces · Despacho a todo Chile</p><div class="hidden items-center gap-4 sm:flex"><a href="/servicio-tecnico" class="transition-colors hover:text-white">Servicio técnico</a><a href="/contacto" class="transition-colors hover:text-white">Cotiza con asesoría</a></div></div></div><div class="bg-primary text-primary-contrast"><div class="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3"><a href="/" class="flex shrink-0 items-center">${renderComponent($$result, "Picture", $$Picture, {
		"src": ecollifenLogo_default,
		"formats": ["avif", "webp"],
		"alt": "Ecollifén",
		"width": 52,
		"height": 52,
		"densities": [1, 2],
		"class": "h-13 w-auto"
	})}</a>${renderComponent($$result, "MainNav", $$MainNav, { "class": "hidden lg:flex justify-around" })}<div class="ml-auto flex items-center gap-1 sm:gap-2"><label class="hidden items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 md:flex"><svg class="size-4 text-green-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3-3"></path></svg><input type="search" placeholder="Buscar productos…" class="w-40 bg-transparent text-sm text-white placeholder:text-green-200 focus:outline-none"></label><button type="button" data-cart-toggle aria-label="Abrir carrito" class="relative flex items-center gap-2 rounded-lg p-2.5 transition-colors hover:bg-white/10"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.5"></circle><circle cx="18" cy="20" r="1.5"></circle><path d="M2 3h3l2.4 12.4a1 1 0 0 0 1 .8h9.3a1 1 0 0 0 1-.8L21 7H6"></path></svg>${renderComponent($$result, "CartBadge", CartBadge, {
		"client:load": true,
		"data-astro-transition-persist": createTransitionScope($$result, "cykaeyu2"),
		"client:component-hydration": "load",
		"client:component-path": "@/components/cart/CartBadge",
		"client:component-export": "default"
	})}<span class="hidden text-sm font-medium sm:inline">Carrito</span></button><button type="button" data-menu-open aria-label="Abrir menú" aria-controls="mobile-menu" aria-expanded="false" class="rounded-lg p-2.5 transition-colors hover:bg-white/10 lg:hidden"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg></button></div></div></div><div id="mobile-menu" class="lg:hidden"><div data-menu-overlay data-menu-close class="fixed inset-0 z-40 bg-black/50 opacity-0 pointer-events-none transition-opacity duration-200"></div><aside data-menu-panel class="fixed top-0 right-0 z-50 flex h-dvh w-80 max-w-[85vw] translate-x-full flex-col bg-primary text-primary-contrast shadow-xl transition-transform duration-200"><div class="flex items-center justify-between border-b border-white/10 px-5 py-4"><span class="font-display text-lg font-semibold">Menú</span><button type="button" data-menu-close aria-label="Cerrar menú" class="rounded-lg p-2 transition-colors hover:bg-white/10"><svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg></button></div><nav class="flex flex-col p-2">${navigation.map((item) => renderTemplate`<a${addAttribute(item.href, "href")} class="rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-white/10">${item.name}</a>`)}</nav><div class="mt-auto flex flex-col gap-1 border-t border-white/10 p-2 text-sm text-green-100"><a href="/contacto" class="rounded-lg px-3 py-3 transition-colors hover:bg-white/10">Cotiza con asesoría</a><a${addAttribute(asesoriaHref(), "href")} class="rounded-lg px-3 py-3 transition-colors hover:bg-white/10">Escribir por WhatsApp</a></div></aside></div></header>${renderScript($$result, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/layout/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/layout/Header.astro", void 0);
//#endregion
//#region src/components/layout/FooterBox.astro
createAstro("https://ecollifen.cl");
var $$FooterBox = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FooterBox;
	const { title, items } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<div class="flex flex-col gap-4"><h3 class="font-mono text-xs uppercase tracking-[0.16em] text-green-300">${title}</h3><ul class="flex flex-col gap-2.5">${items.map((item) => renderTemplate`<li><a${addAttribute(item.href, "href")} class="text-sm text-cream-200/75 transition-colors hover:text-cream-50">${item.name}</a></li>`)}</ul></div>`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/layout/FooterBox.astro", void 0);
//#endregion
//#region src/components/layout/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<footer class="bg-primary text-primary-contrast"><div class="mx-auto max-w-6xl px-6 py-14"><div class="grid grid-cols-1 gap-10 sm:grid-cols-3">${[
		{
			title: "Tienda",
			items: [
				{
					name: "Agrícola",
					href: "/tienda/agricola"
				},
				{
					name: "Jardinería",
					href: "/tienda/jardineria"
				},
				{
					name: "Herramientas a batería",
					href: "/tienda/herramientas-a-bateria"
				},
				{
					name: "Ver todo el catálogo",
					href: "/tienda"
				}
			]
		},
		{
			title: "Servicio técnico",
			items: [
				{
					name: "Qué resolvemos",
					href: "/servicio-tecnico"
				},
				{
					name: "Cómo funciona",
					href: "/servicio-tecnico"
				},
				{
					name: "Cobertura",
					href: "/servicio-tecnico"
				},
				{
					name: "Agendar servicio",
					href: "/servicio-tecnico"
				}
			]
		},
		{
			title: "Empresa",
			items: [
				{
					name: "Nosotros",
					href: "/nosotros"
				},
				{
					name: "Solicitar asesoría",
					href: "/contacto"
				},
				{
					name: "marca@ecollifen.cl",
					href: "mailto:marca@ecollifen.cl"
				}
			]
		}
	].map((column) => renderTemplate`${renderComponent($$result, "FooterBox", $$FooterBox, {
		"title": column.title,
		"items": column.items
	})}`)}</div><div class="mt-12 flex flex-col gap-3 border-t border-cream-50/10 pt-6 sm:flex-row sm:items-center sm:justify-center"><p class="text-xs text-cream-200/60">&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Ecollifén SpA · Todos los derechos reservados.</p><p class="font-display text-sm italic text-green-300">Soluciones que echan raíces.</p></div></div></footer>`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/layout/Footer.astro", void 0);
//#endregion
//#region src/components/cart/CartDrawer.tsx
var CHECKOUT_URL = `undefined/checkout`;
function CartDrawer() {
	const cart = useStore(cartStore);
	const open = useStore(cartOpen);
	useEffect(() => {
		document.body.classList.toggle("overflow-hidden", open);
		return () => document.body.classList.remove("overflow-hidden");
	}, [open]);
	const close = () => cartOpen.set(false);
	return jsxs("div", { children: [jsx("div", {
		onClick: close,
		class: `fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`
	}), jsxs("aside", {
		class: `fixed inset-y-0 right-0 z-50 flex h-dvh w-96 max-w-[90vw] flex-col bg-background shadow-xl transition-transform duration-200 ${open ? "translate-x-0" : "translate-x-full"}`,
		inert: !open,
		children: [jsxs("header", {
			class: "flex items-center justify-between border-b border-border px-5 py-4",
			children: [jsxs("h2", {
				class: "font-display text-lg font-semibold text-primary",
				children: [
					"Tu carrito (",
					cart.count,
					")"
				]
			}), jsx("button", {
				onClick: close,
				"aria-label": "Cerrar carrito",
				class: "rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-alt hover:text-primary",
				children: jsx("svg", {
					class: "size-5",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "currentColor",
					"stroke-width": "2",
					"stroke-linecap": "round",
					children: jsx("path", { d: "M6 6l12 12M18 6 6 18" })
				})
			})]
		}), cart.items.length === 0 ? jsxs("div", {
			class: "flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center",
			children: [jsx("p", {
				class: "text-muted",
				children: "Tu carrito está vacío."
			}), jsx("a", {
				href: "/tienda",
				onClick: close,
				class: "rounded-lg bg-cta px-5 py-2.5 font-semibold text-cta-contrast transition-colors hover:bg-green-600",
				children: "Ir a la tienda"
			})]
		}) : jsxs(Fragment, { children: [jsx("ul", {
			class: "flex-1 divide-y divide-border overflow-y-auto",
			children: cart.items.map((item) => jsxs("li", {
				class: "flex gap-3 p-4",
				children: [
					jsx("div", {
						class: "size-16 shrink-0 overflow-hidden rounded-lg border border-border bg-surface",
						children: item.image && jsx("img", {
							src: item.image,
							alt: "",
							class: "h-full w-full object-contain"
						})
					}),
					jsxs("div", {
						class: "flex min-w-0 flex-1 flex-col",
						children: [
							jsx("p", {
								class: "line-clamp-2 text-sm font-medium text-foreground",
								children: item.name
							}),
							jsx("p", {
								class: "text-sm font-semibold text-green-700",
								children: formatMoney(item.lineTotal, cart.currency)
							}),
							jsxs("div", {
								class: "mt-auto flex items-center gap-1",
								children: [
									jsx("button", {
										onClick: () => updateQuantity(item.key, Math.max(1, item.quantity - 1)),
										"aria-label": "Restar",
										class: "flex size-7 items-center justify-center rounded-md border border-border text-muted transition-colors hover:bg-surface-alt",
										children: "−"
									}),
									jsx("span", {
										class: "w-8 text-center text-sm tabular-nums",
										children: item.quantity
									}),
									jsx("button", {
										onClick: () => updateQuantity(item.key, item.quantity + 1),
										"aria-label": "Sumar",
										class: "flex size-7 items-center justify-center rounded-md border border-border text-muted transition-colors hover:bg-surface-alt",
										children: "+"
									})
								]
							})
						]
					}),
					jsx("button", {
						onClick: () => removeFromCart(item.key),
						"aria-label": "Quitar del carrito",
						class: "self-start rounded-md p-1 text-muted transition-colors hover:text-danger",
						children: jsx("svg", {
							class: "size-4",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							children: jsx("path", { d: "M6 6l12 12M18 6 6 18" })
						})
					})
				]
			}, item.key))
		}), jsxs("footer", {
			class: "border-t border-border p-5",
			children: [
				jsxs("div", {
					class: "flex items-baseline justify-between",
					children: [jsx("span", {
						class: "font-medium text-foreground",
						children: "Subtotal"
					}), jsx("span", {
						class: "text-lg font-semibold text-foreground",
						children: formatMoney(cart.total, cart.currency)
					})]
				}),
				jsx("p", {
					class: "mt-1 text-xs text-muted",
					children: "Despacho e impuestos se calculan en el pago."
				}),
				jsx("a", {
					href: CHECKOUT_URL,
					class: "mt-4 block rounded-lg bg-cta py-3 text-center font-semibold text-cta-contrast transition-colors hover:bg-green-600",
					children: "Ir a pagar"
				}),
				jsx("button", {
					onClick: close,
					class: "mt-2 w-full py-2 text-center text-sm text-muted transition-colors hover:text-primary",
					children: "Seguir comprando"
				})
			]
		})] })]
	})] });
}
//#endregion
//#region src/components/product/PreciosEnVivo.astro
var $$PreciosEnVivo = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderScript($$result, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/product/PreciosEnVivo.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/components/product/PreciosEnVivo.astro", void 0);
//#endregion
//#region src/layouts/Layout.astro
createAstro("https://ecollifen.cl");
var $$Layout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Layout;
	const { title } = Astro.props;
	return renderTemplate`<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro.generator, "content")}><title>Ecollifen | ${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">${renderComponent($$result, "ClientRouter", $$ClientRouter, {})}${renderHead($$result)}</head><body>${renderComponent($$result, "HeaderAstroComponent", $$Header, {})}${renderSlot($$result, $$slots["default"])}${renderComponent($$result, "Footer", $$Footer, {})}${renderComponent($$result, "CartDrawer", CartDrawer, {
		"client:load": true,
		"data-astro-transition-persist": createTransitionScope($$result, "yztbsuuz"),
		"client:component-hydration": "load",
		"client:component-path": "@/components/cart/CartDrawer",
		"client:component-export": "default"
	})}${renderComponent($$result, "PreciosEnVivo", $$PreciosEnVivo, {})}</body></html>${renderScript($$result, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Gamer/Desktop/ProyectosWEB/Ecollifen/Ecollifen-astro/ecollifen/src/layouts/Layout.astro", void 0);
//#endregion
export { $$Picture as a, parseQuality as c, __exportAll as d, hayWhatsApp as i, detector as l, MENSAJE_SERVICIO as n, $$Image as o, asesoriaHref as r, baseService as s, $$Layout as t, resolveDefaultOutputFormat as u };
