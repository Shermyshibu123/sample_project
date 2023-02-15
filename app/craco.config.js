/*
  This file is for customosin Ant Design. We can change colour theme
  by changin less antd less variables

  Reference Link: https://ant.design/docs/react/use-with-create-react-app#Customize-Theme
*/

const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: {
            // '@body-background': '#d8e8fe',
            // '@primary-color': 'rgba(255, 255, 255, .9)',
            // '@text-color': '#000',

            // //Input
            // '@input-bg': '#ebecf1',

            // //Select
            // '@select-background': '#ebecf1',

            // //Picker
            // '@picker-bg': '#ebecf1',

            // //Button
            // '@btn-border-radius-base': '0.5rem',

            // //Table
            // '@table-header-bg': '#1e1f50',
            // '@table-header-color': '#fff',
            // '@table-row-color': '#cdcdcd',
            // '@table-padding-horizontal': '24px',
            // '@table-border-radius-base': '6px'
          },
          javascriptEnabled: true,
        },
      },
    },
  ],
};
