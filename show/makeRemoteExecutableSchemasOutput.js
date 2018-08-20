{
  "_queryType": "query_root",
  "_mutationType": "mutation_root",
  "_subscriptionType": "subscription_root",
  "_directives": [
    {
      "name": "skip",
      "description": "Directs the executor to skip this field or fragment when the `if` argument is true.",
      "locations": [
        "FIELD",
        "FRAGMENT_SPREAD",
        "INLINE_FRAGMENT"
      ],
      "args": [
        {
          "name": "if",
          "description": "Skipped when true.",
          "type": "Boolean!"
        }
      ]
    },
    {
      "name": "include",
      "description": "Directs the executor to include this field or fragment only when the `if` argument is true.",
      "locations": [
        "FIELD",
        "FRAGMENT_SPREAD",
        "INLINE_FRAGMENT"
      ],
      "args": [
        {
          "name": "if",
          "description": "Included when true.",
          "type": "Boolean!"
        }
      ]
    },
    {
      "name": "deprecated",
      "description": "Marks an element of a GraphQL schema as no longer supported.",
      "locations": [
        "FIELD_DEFINITION",
        "ENUM_VALUE"
      ],
      "args": [
        {
          "name": "reason",
          "description": "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted in [Markdown](https://daringfireball.net/projects/markdown/).",
          "type": "String",
          "defaultValue": "No longer supported"
        }
      ]
    }
  ],
  "astNode": {
    "kind": "SchemaDefinition",
    "directives": [],
    "operationTypes": [
      {
        "kind": "OperationTypeDefinition",
        "operation": "query",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "query_root",
            "loc": {
              "start": 18,
              "end": 28
            }
          },
          "loc": {
            "start": 18,
            "end": 28
          }
        },
        "loc": {
          "start": 11,
          "end": 28
        }
      },
      {
        "kind": "OperationTypeDefinition",
        "operation": "mutation",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "mutation_root",
            "loc": {
              "start": 41,
              "end": 54
            }
          },
          "loc": {
            "start": 41,
            "end": 54
          }
        },
        "loc": {
          "start": 31,
          "end": 54
        }
      },
      {
        "kind": "OperationTypeDefinition",
        "operation": "subscription",
        "type": {
          "kind": "NamedType",
          "name": {
            "kind": "Name",
            "value": "subscription_root",
            "loc": {
              "start": 71,
              "end": 88
            }
          },
          "loc": {
            "start": 71,
            "end": 88
          }
        },
        "loc": {
          "start": 57,
          "end": 88
        }
      }
    ],
    "loc": {
      "start": 0,
      "end": 90
    }
  },
  "_typeMap": {
    "query_root": "query_root",
    "Int": "Int",
    "game_order_by": "game_order_by",
    "game_bool_exp": "game_bool_exp",
    "integer_comparison_exp": "integer_comparison_exp",
    "Boolean": "Boolean",
    "text_comparison_exp": "text_comparison_exp",
    "String": "String",
    "boolean_comparison_exp": "boolean_comparison_exp",
    "game": "game",
    "mutation_root": "mutation_root",
    "game_insert_input": "game_insert_input",
    "game_on_conflict": "game_on_conflict",
    "conflict_action": "conflict_action",
    "game_constraint": "game_constraint",
    "game_mutation_response": "game_mutation_response",
    "game_no_rels": "game_no_rels",
    "subscription_root": "subscription_root",
    "__Schema": "__Schema",
    "__Type": "__Type",
    "__TypeKind": "__TypeKind",
    "__Field": "__Field",
    "__InputValue": "__InputValue",
    "__EnumValue": "__EnumValue",
    "__Directive": "__Directive",
    "__DirectiveLocation": "__DirectiveLocation"
  },
  "_implementations": {}
}
