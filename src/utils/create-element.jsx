/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const React = require('react');
/* eslint-enable no-unused-vars */
const NProgress = require('nprogress-for-antd');

module.exports = function createElement(Component, props) {
  NProgress.done();
  // eslint-disable-next-line react/destructuring-assignment
  const dynamicPropsKey = props.location.pathname;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...props} {...Component[dynamicPropsKey]} />;
};
