const fs = require('fs');
const path = require('path');

// 当前目录路径
const currentDir = __dirname;
// 输出文件路径
const outputFilePath = path.join(currentDir, 'coze.md');

// 存储所有markdown内容
let mergedContent = '';

/**
 * 递归遍历目录，找到所有md文件并处理
 * @param {string} dir - 要遍历的目录路径
 */
function traverseDirectory(dir) {
  try {
    // 读取目录内容
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      // 如果是目录，递归遍历
      if (stat.isDirectory()) {
        traverseDirectory(filePath);
      } 
      // 如果是md文件，读取内容
      else if (path.extname(file).toLowerCase() === '.md') {
        try {
          // 读取文件内容
          const content = fs.readFileSync(filePath, 'utf8');
          // 获取文件名（不包含扩展名）作为h1标题
          const fileName = path.basename(file, '.md');
          // 添加到合并内容中
          mergedContent += `# ${fileName}\n\n${content}\n\n---\n\n`;
          console.log(`已处理: ${filePath}`);
        } catch (error) {
          console.error(`读取文件失败: ${filePath}`, error);
        }
      }
    });
  } catch (error) {
    console.error(`遍历目录失败: ${dir}`, error);
  }
}

// 开始遍历目录
console.log('开始遍历目录，查找所有md文件...');
traverseDirectory(currentDir);

// 写入合并内容到coze.md
if (mergedContent) {
  try {
    fs.writeFileSync(outputFilePath, mergedContent, 'utf8');
    console.log(`\n合并完成！所有md文件内容已写入到 ${outputFilePath}`);
  } catch (error) {
    console.error(`写入文件失败: ${outputFilePath}`, error);
  }
} else {
  console.log('没有找到任何md文件！');
}