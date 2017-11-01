// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

const createHelper = require('./mdx-helper');
const React = require('react');
const {
  headingFactories,
  elementFactories,
  HeadingEl,
  El,
  addDocClass
} = createHelper();
// We wrap the normal mdxc stuff with our own loader so we can add .doc to each element and
// have a bit of control with a Doc component wrapper)

module.exports = code =>
  `
    import Doc from '../../../shared/components/Doc';

  const addDocClass = ${addDocClass.toString()}

  const El = ${El.toString()}
  const HeadingEl = ${HeadingEl.toString()}

  const factories = {${headingFactories}, ${elementFactories}}

  const toc = [];
  export const getToc = () => toc;

    ${code.replace(
      /export default function/,
      'export const Content = function'
    )}
    export default props => <Doc><Content {...props} factories={factories} /></Doc>
  `;
