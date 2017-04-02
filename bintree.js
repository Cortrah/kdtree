//==================================================================================
// createNode - Node constructor used by KdTree
//==================================================================================
function createNode(value){
    this.value = value;
    this.right = null;
    this.left = null;
    this.parent = null;
    return this;
}

//==================================================================================
// createBinTree - constructor - can take a value or not
// 		    if no value when created - then the first add operation
//		    will determine the type of values expected
//        The values can be strings, int's or movieclip references
//==================================================================================
function createBinTree(rootValue) {

    if (rootValue == null) {
        // an empty set means rootNode == null
        // an empty set means keytype == undefined
        this.cardinality = 0;
    } else {
        this.rootNode = new createNode(rootValue);
        this.keyType = typeof(rootValue);
        this.cardinality = 1;
    }
    return this;
}

//==============================================================================
// lessThan - internal comparison operator so we can do ints strings or clips
//==============================================================================
createBinTree.prototype.lessThan = (function (fst, snd) {
    if (this.cardinality > 0) {
        if (this.keyType === "string") {
            if (fst < snd) {
                return true;
            } else {
                return false;
            }
        } else if (this.keyType === "number") {
            if (fst < snd) {
                return true;
            } else {
                return false;
            }
        } else {
            // use the names of the clips which are strings
            if (fst < snd) {
                return true;
            } else {
                return false;
            }
        }
    }
});

//==============================================================================
// equals internal comparison operator so we can do ints strings or clips
//==============================================================================
createBinTree.prototype.equals = (function (fst, snd) {
    if (this.cardinality > 0) {
        if (this.keyType === "string") {
            if (fst === snd) {
                return true;
            } else {
                return false;
            }
        } else if (this.keyType === "number") {
            if (fst === snd) {
                return true;
            } else {
                return false;
            }
        } else {
            // use the names of the clips, strings
            if (fst === snd) {
                return true;
            } else {
                return false;
            }
        }
    }
});

//==============================================================================
// addNode - adds a value to the binary tree
//==============================================================================
createBinTree.prototype.addNode = (function (newValue) {
    var parentPtr = null;
    var goalPtr = this.rootNode;

    if (this.cardinality == 0) {
        if (newValue != null) {
            this.rootNode = new createNode(newValue);
            this.keyType = typeof(newValue);
            this.cardinality = 1;
            return true;
        } else {
            return false;
        }
    } else {
        while (goalPtr.value != null) {
            parentPtr = goalPtr;
            if (this.lessThan(newValue, goalPtr.value)) {
                goalPtr = goalPtr.left;
            } else if (this.equals(newValue, goalPtr.value)) {
                return false;
            } else {
                goalPtr = goalPtr.right;
            }
        }
        goalPtr.parent = parentPtr;
        if (parentPtr == null) {
            this.rootNode.value = newValue;
        } else {
            if (this.lessThan(newValue, parentPtr.value)) {
                parentPtr.left = new createNode(newValue);
                parentPtr.left.parent = parentPtr;
                this.cardinality++;
            } else if (this.lessThan(parentPtr.value, newValue)) {
                parentPtr.right = new createNode(newValue);
                parentPtr.right.parent = parentPtr;
                this.cardinality++;
            } else {
                return false;
            }
        }
        return true;
    }
});

//==============================================================================
// containsNode - takes a value and returns true if it is in the set
//==============================================================================
createBinTree.prototype.containsNode = (function (findValue) {
    return this.containsNodeRec(findValue, this.rootNode)
});
createBinTree.prototype.containsNodeRec = (function (findValue, locationPtr) {
    if (locationPtr == null) {
        return false;
    } else if (this.equals(locationPtr.value, findValue)) {
        return true;
    } else if (this.lessThan(findValue, locationPtr.Value)) {
        return this.containsNodeRec(findValue, locationPtr.left);
    } else if (this.lessThan(locationPtr.Value, findValue)) {
        return this.containsNodeRec(findValue, locationPtr.right);
    }
});

//==============================================================================
// deleteNode - takes a value and removes from the set
//==============================================================================
createBinTree.prototype.deleteNode = (function (nodeValue) {
    this.deleteNodePtr(this.getNodePtr(nodeValue));
});
createBinTree.prototype.deleteNodePtr = (function (delNodePtr) {
    var theSuccessor;
    var successorsChild;

    if (delNodePtr == null) {
        // then the getNodPtr returned a null and the value wasn't in the tree to be deleted
        // trace("value wasn't in tree");
    } else {
        if ((delNodePtr.left == null) || (delNodePtr.right == null)) {
            theSuccessor = delNodePtr;
        } else {
            theSuccessor = this.getNextLocValPtr(delNodePtr);
        }

        if (theSuccessor.left != null) {
            successorsChild = theSuccessor.left;
        } else {
            successorsChild = theSuccessor.right;
        }

        if (successorsChild != null) {
            successorsChild.parent = theSuccessor.parent;
        }

        if (theSuccessor.parent == null) {
            this.rootNode = successorsChild;
        } else if (theSuccessor == theSuccessor.parent.left) {
            theSuccessor.parent.left = successorsChild;
        } else {
            theSuccessor.parent.right = successorsChild;
        }

        if (theSuccessor != delNodePtr) {
            delNodePtr.value = theSuccessor.value;
            // copy y's other values as well.
            // color properties for example for a Red Black tree
        }
        this.cardinality--;
        return theSuccessor;
    }
});

//==============================================================================
// getCardinality
//==============================================================================
createBinTree.prototype.getCardinality = (function () {
    return this.cardinality;
});

//==============================================================================
// getNodePtr - an internal function that takes a value
//		and returns a pointer to its node in the tree, or null.
//==============================================================================
createBinTree.prototype.getNodePtr = (function (findValue) {
    var locationPtr = this.rootNode;

    // walk down the tree until we find the node or hit a null leaf
    while ((locationPtr != null) && (findValue != locationPtr.value)) {
        if (this.lessThan(findValue, locationPtr.value)) {
            locationPtr = locationPtr.left;
        } else {
            locationPtr = locationPtr.right;
        }
    }
    return locationPtr;
});

//==============================================================================
// getMinVal
//==============================================================================
createBinTree.prototype.getMinVal = (function (locationPtr) {
    return this.getMinValPtr(locationPtr).value;
});
createBinTree.prototype.getMinValPtr = (function (locationPtr) {

    if (locationPtr == null) {
        locationPtr = this.rootNode;
    }
    while (locationPtr.left != null) {
        locationPtr = locationPtr.left;
    }
    return locationPtr;
});

//==================================================================================
// getMaxVal
//==================================================================================
createBinTree.prototype.getMaxVal = (function (locationPtr) {
    return this.getMaxValPtr(locationPtr).value;
});
createBinTree.prototype.getMaxValPtr = (function (locationPtr) {

    if (locationPtr == null) {
        locationPtr = this.rootNode;
    }
    while (locationPtr.right != null) {
        locationPtr = locationPtr.right;
    }
    return locationPtr;
});

//==================================================================================
// getRandVal
//==================================================================================
createBinTree.prototype.getRandVal = (function () {
    return this.getRandValPtr(this.getMinValPtr(this.rootNode)).value;
});
createBinTree.prototype.getRandValPtr = (function (locationPtr) {
    var randomIndex = random(this.cardinality) + 1;
    var i;

    for (i = 1; i < randomIndex; i++) {
        locationPtr = this.getNextLocValPtr(locationPtr);
    }
    return locationPtr;
});

//==============================================================================
// getRootPtr - This function allows a user to start steping through the tree
//==============================================================================
createBinTree.prototype.getRootPtr = (function () {
    return this.rootNode;
});

//==============================================================================
// getNextLocVal - The ptr function allows a user to step through the tree
//==============================================================================
createBinTree.prototype.getNextLocVal = (function (locationPtr) {
    return this.getNextLocValPtr(locationPtr).value;
});
createBinTree.prototype.getNextLocValPtr = (function (locationPtr) {
    var returnValPtr;

    if (locationPtr == null) {
        locationPtr = this.rootNode;
    }

    if (locationPtr.right != null) {
        return this.getMinValPtr(locationPtr.right);
    } else {
        returnValPtr = locationPtr.parent;
        while ((returnValPtr != null) && (locationPtr.value == returnValPtr.right.value)) {
            locationPtr = returnValPtr;
            returnValPtr = returnValPtr.parent;
        }
        return returnValPtr;
    }
});

//==============================================================================
// getPrevLocVal - The ptr function allows a user to step through the tree
//==============================================================================
createBinTree.prototype.getPrevLocVal = (function (locationPtr) {
    return this.getPrevLocValPtr(locationPtr).value;
});
createBinTree.prototype.getPrevLocValPtr = (function (locationPtr) {
    var returnValPtr;

    if (locationPtr == null) {
        locationPtr = this.rootNode;
    }

    if (locationPtr.left != null) {
        return this.getMaxValPtr(locationPtr.left);
    } else {
        returnValPtr = locationPtr.parent;
        while ((returnValPtr != null) && (locationPtr.value == returnValPtr.left.value)) {
            locationPtr = returnValPtr;
            returnValPtr = returnValPtr.parent;
        }
        return returnValPtr;
    }
});

//==============================================================================
// displayTree - steps through and outputs the values of the tree to a field
//
//    binTreeView
//		cardinality
//		and valueType are dynamic textboxes on the stage.
//==============================================================================
createBinTree.prototype.displayTree = (function () {
    binTreeView = "";
    this.displayTreePtr(this.rootNode, "");
});
createBinTree.prototype.displayTreePtr = (function (locationPtr, depthPadding) {
    if (locationPtr != null) {
        this.displayTreePtr(locationPtr.right, depthPadding + "  ");
        binTreeView = binTreeView + depthPadding + locationPtr.value + "\n";
        this.displayTreePtr(locationPtr.left, depthPadding + "  ");
    } else {
        //uncomment the next line if you'd like to see the null leaves
        //BinTreeView = BinTreeView + depthPadding + "nil" + "\n";
    }
    cardinality = this.cardinality;
    valueType = bintree.keyType;
});

