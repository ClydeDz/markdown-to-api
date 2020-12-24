
const configFileSchema= {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://example.com/example.json",
    "type": "array",
    "title": "The root schema",
    "description": "The root schema comprises the entire JSON document.",
    "default": [],
    "examples": [
        [
            {
                "input": "testing/portfolio",
                "output": "testing/output/all",
                "summaryOutput": "testing/summary",
                "filename": "portfolio.json",
                "inputFileFilter": ".pin.md"
            },
            {
                "input": "testing/portfolio/books",
                "output": "testing/output/books",
                "summaryOutput": "testing/summary",
                "filename": "books.json",
                "inputFileFilter": ".md"
            }
        ]
    ],
    "additionalItems": true,
    "items": {
        "$id": "#/items",
        "anyOf": [
            {
                "$id": "#/items/anyOf/0",
                "type": "object",
                "title": "The first anyOf schema",
                "description": "An explanation about the purpose of this instance.",
                "default": {},
                "examples": [
                    {
                        "input": "testing/portfolio",
                        "output": "testing/output/all",
                        "summaryOutput": "testing/summary",
                        "filename": "portfolio.json",
                        "inputFileFilter": ".pin.md"
                    }
                ],
                "required": [
                    "input",
                    "output",
                    "summaryOutput",
                    "filename",
                    "inputFileFilter"
                ],
                "properties": {
                    "input": {
                        "$id": "#/items/anyOf/0/properties/input",
                        "type": "string",
                        "title": "The input schema",
                        "description": "An explanation about the purpose of this instance.",
                        "default": "",
                        "examples": [
                            "testing/portfolio"
                        ]
                    },
                    "output": {
                        "$id": "#/items/anyOf/0/properties/output",
                        "type": "string",
                        "title": "The output schema",
                        "description": "An explanation about the purpose of this instance.",
                        "default": "",
                        "examples": [
                            "testing/output/all"
                        ]
                    },
                    "summaryOutput": {
                        "$id": "#/items/anyOf/0/properties/summaryOutput",
                        "type": "string",
                        "title": "The summaryOutput schema",
                        "description": "An explanation about the purpose of this instance.",
                        "default": "",
                        "examples": [
                            "testing/summary"
                        ]
                    },
                    "filename": {
                        "$id": "#/items/anyOf/0/properties/filename",
                        "type": "string",
                        "title": "The filename schema",
                        "description": "An explanation about the purpose of this instance.",
                        "default": "",
                        "examples": [
                            "portfolio.json"
                        ]
                    },
                    "inputFileFilter": {
                        "$id": "#/items/anyOf/0/properties/inputFileFilter",
                        "type": "string",
                        "title": "The inputFileFilter schema",
                        "description": "An explanation about the purpose of this instance.",
                        "default": "",
                        "examples": [
                            ".pin.md"
                        ]
                    }
                },
                "additionalProperties": true
            }
        ]
    }
};

exports.configFileSchema = configFileSchema; 