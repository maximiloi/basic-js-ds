const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this.tree = null;
    }

    root() {
        return this.tree;
    }

    add(data) {
        this.tree = addWithin(this.tree, data);

        function addWithin(node, data) {
            if (!node) {
                return new Node(data);
            }

            if (node.data === data) {
                return node;
            }

            if (data < node.data) {
                node.left = addWithin(node.left, data);
            } else {
                node.right = addWithin(node.right, data);
            }

            return node;
        }
    }

    has(data) {
        return hasNode(this.tree, data);

        function hasNode(node, data) {
            if (!node) {
                return false;
            }

            if (node.data === data) {
                return true;
            }

            if (data < node.data) {
                return hasNode(node.left, data);
            } else {
                return hasNode(node.right, data);
            }
        }
    }

    find(data) {
        return findNode(this.tree, data);

        function findNode(node, data) {
            if (!node) {
                return null;
            }

            if (node.data === data) {
                return node;
            }

            if (data < node.data) {
                return findNode(node.left, data);
            } else {
                return findNode(node.right, data);
            }
        }
    }

    remove(data) {
        this.tree = removeNode(this.tree, data);

        function removeNode(node, data) {
            if (!node) {
                return null;
            }

            if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else if (node.data < data) {
                node.right = removeNode(node.right, data);
                return node;
            } else {
                // equal - should remove this item
                if (!node.left && !node.right) {
                    // put null instead of item
                    return null;
                }

                if (!node.left) {
                    // set right child instead of item
                    node = node.right;
                    return node;
                }

                if (!node.right) {
                    // set left child instead of item
                    node = node.left;
                    return node;
                }

                // both children exists for this item
                let minFromRight = node.right;
                while (minFromRight.left) {
                    minFromRight = minFromRight.left;
                }
                node.data = minFromRight.data;

                node.right = removeNode(node.right, minFromRight.data);

                return node;
            }
        }
    }

    min() {
        if (!this.tree) {
            return;
        }

        let node = this.tree;
        while (node.left) {
            node = node.left;
        }

        return node.data;
    }

    max() {
        if (!this.tree) {
            return;
        }

        let node = this.tree;
        while (node.right) {
            node = node.right;
        }

        return node.data;
    }
}

module.exports = {
    BinarySearchTree,
};
