const fs = require('fs');
const path = require('path');

// 简单的UUID生成函数
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 读取文件内容
function readFileContent(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('读取文件失败:', error);
    throw error;
  }
}

// 解析Markdown内容
function parseMarkdown(content) {
  const result = [];
  // 匹配二级标题、描述和在线地址的正则表达式
  const sectionRegex = /##\s+([^\n]+)\n([\s\S]*?)(?=(?:##|$))/g;
  let match;
  
  while ((match = sectionRegex.exec(content)) !== null) {
    const title = match[1].trim();
    const sectionContent = match[2].trim();
    
    // 提取描述（第一个换行前的内容）
    const description = sectionContent.split('\n')[0].trim();
    
    // 提取图片地址
    const imageRegex = /!\[.*?\]\((.*?)\)/;
    const imageMatch = sectionContent.match(imageRegex);
    const pageCover = imageMatch ? imageMatch[1] : '';
    
    // 提取在线地址
    const linkRegex = /在线地址：\[(.*?)\]\((.*?)\)/;
    const linkMatch = sectionContent.match(linkRegex);
    const pageLink = linkMatch ? linkMatch[2] : '';
    
    if (title && pageLink) {
      result.push({
        id: generateId(),
        name: title,
        description: description,
        applicationDomainId: '',
        applicationWayId: '',
        tagIds: [],
        pageLink: pageLink,
        pageCover: pageCover,
        icon: '',
        updatedAt: '2025-09-26T05:49:32.106Z'
      });
    }
  }
  
  return result;
}

// 保存JSON文件
function saveJSON(data, outputPath) {
  try {
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`数据已成功保存到: ${outputPath}`);
  } catch (error) {
    console.error('保存文件失败:', error);
    throw error;
  }
}

// 主函数
function main() {
  const inputFilePath = path.join(__dirname, 'coze.md');
  const outputFilePath = path.join(__dirname, 'coze.json');
  
  try {
    const content = readFileContent(inputFilePath);
    const parsedData = parseMarkdown(content);
    saveJSON(parsedData, outputFilePath);
  } catch (error) {
    console.error('处理文件时发生错误:', error);
  }
}

// 执行主函数
main();