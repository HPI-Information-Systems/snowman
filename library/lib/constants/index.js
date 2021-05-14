"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonSimilarityThresholdColumns = exports.GoldStandardId = exports.SilverStandardId = void 0;
exports.SilverStandardId = -1;
exports.GoldStandardId = -2;
// !ALL COLUMNS EXPLICITLY STATED IN WRAPPER/API/DATABASE/SCHEMAS/EXPERIMENT -> EXPERIMENT
exports.NonSimilarityThresholdColumns = new Set([
    'id1',
    'id2',
    'isDuplicate',
    'isDuplicateAndLinksUnlinkedNodes',
]);
