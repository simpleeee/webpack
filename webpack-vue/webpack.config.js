var path = require('path');
var webpack = require('webpack');
var babelpolyfill = require("babel-polyfill");
var VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
	entry: ['babel-polyfill', './src/main.js'], // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
	devtool: '#eval-source-map',
	output: {
		path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
		publicPath: '/dist/', // 通过devServer访问路径
		filename: 'build.js' // 打包后的文件名
	},
	devServer: {
		historyApiFallback: true, //historyApiFallback设置为true那么所有的路径都执行index.html。
		overlay: true // 将错误显示在html之上
	},
	resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
	},
	plugins: [
		new VueLoaderPlugin()
	  ],
	  
	module: {
        rules: [
            { //匹配后缀名为css的文件,然后分别用css-loader，vue-style-loader去解析
              //解析器的执行顺序是从下往上(先css-loader再vue-style-loader)
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/  
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'scss': [
							'vue-style-loader',
							'css-loader',
							'sass-loader'
						],
						'sass': [
							'vue-style-loader',
							'css-loader',
							'sass-loader?indentedSyntax'
						]
					}
				}
			}
        ]
	},
	
};