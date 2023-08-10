import { readdir, mkdir, copyFile } from 'node:fs/promises';

export const copyFolder = async (sourceDir, targetDir, callback) => {
  try {
    const files = await readdir(sourceDir, { withFileTypes: true });

    await mkdir(targetDir, { recursive: true });
    console.log('Папка создана');

    for (const file of files) {
      if (file.isDirectory()) {
        await copyFolder(
          `${sourceDir}/${file.name}`,
          `${targetDir}/${file.name}`,
          () => {},
        );
        console.log(file, 'скопирован');
      } else {
        await copyFile(
          `${sourceDir}/${file.name}`,
          `${targetDir}/${file.name}`,
        );
        console.log(file, 'скопирован');
      }
    }

    callback(null);
  } catch (err) {
    console.error(`Ошибка: ${err.message}`);
    callback(err);
  }
};

// export const copyFolder = async (sourceDir, targetDir, callback) => {
//   try {
//     readdir(sourceDir, { withFileTypes: true })
//       .then(async files => {
//         await mkdir(targetDir, { recursive: true });
//         console.log('Папка создана');
//         return files;
//       })
//       .then(files => {
//         files.forEach(async file => {
//           if (file.isDirectory()) {
//             await copyFolder(
//               `${sourceDir}/${file.name}`,
//               `${targetDir}/${file.name}`,
//             );
//             console.log(file, 'скопирован');
//           } else {
//             await copyFile(
//               `${sourceDir}/${file.name}`,
//               `${targetDir}/${file.name}`,
//             );
//             console.log(file, 'скопирован');
//           }
//         });
//       });
//   } catch (err) {
//     console.error(`Ошибка: ${err.message}`);
//     callback(err);
//   }
// };
