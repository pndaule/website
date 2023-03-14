---
id: objects 
title: RPC Objects 
sidebar_label: Objects
description: RPC Objects | Iron Fish Documentation
hide_table_of_contents: false
---
import JsDisplay from '../../../src/theme/components/Terminal/JsDisplay'

A list of objects returned by RPC calls

## block
Representation of a block

<JsDisplay js={`{
    hash (string): The block hash (in hex)
    sequence (number): The sequence of the block
    prev (string): The previous (?)
    main (boolean): True if this block is part of the main chain
    graffiti (string): The graffiti of the user who mined this block
    timestamp (number): The time this block was mined
    work (string): The work to mine this block
    difficulty (string): The difficulty to mine this block
    head (boolean): True if this is the head block
    latest (boolean): True if this is the latest block
}
`} />
