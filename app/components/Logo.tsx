import React from "react";
// material-ui
import { Comment } from "react-loader-spinner";
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'public/images/logo-dark.svg';
 * import logo from 'public/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Berry" width="100" />
     *
     */
    <Comment
      visible={true}
      height="32"
      width="auto"
      ariaLabel="comment-loading"
      wrapperStyle={{}}
      wrapperClass="comment-wrapper"
      color="#fff"
    />
  );
};

export default Logo;
