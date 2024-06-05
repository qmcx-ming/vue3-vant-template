import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// 生成svg图标
export default function createSvgIcon(isBuild) {
    return createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
		iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
        // 是否使用压缩的svg文件，默认是压缩的 [不开启压缩有个问题，svg颜色无法生效]
        // isBuild 即 是否为build模式，build模式下会自动压缩
        // svgoOptions: isBuild
    });
}
