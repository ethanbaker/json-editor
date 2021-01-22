#!/bin/bash

edit () {
    if [ ! -f $1 ]; then
        echo "ERROR: File does not exist!"
        return
    fi
    if [ ! -f staging.json ]; then
        touch staging.json
    fi
    cat $1 > staging.json
    open http://localhost
    node ~/.bash/json-editor/server.js
    cat staging.json > $1
    rm staging.json
    clear
    echo "Script editing complete!" $1 "is now updated."
}

export -f edit