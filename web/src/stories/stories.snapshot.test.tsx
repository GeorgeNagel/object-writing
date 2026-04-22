import { beforeAll, describe, expect, test } from 'vitest'
import { composeStories, setProjectAnnotations } from '@storybook/react-vite'
import * as previewAnnotations from '../../.storybook/preview'
import path from 'path'

const annotations = setProjectAnnotations([previewAnnotations])
beforeAll(annotations.beforeAll)

type StoryModule = { default: any; [name: string]: any }

function getAllStoryFiles() {
  const modules = import.meta.glob<StoryModule>('./*.stories.tsx', { eager: true })
  return Object.entries(modules).map(([filePath, storyFile]) => ({
    filePath,
    storyFile,
    componentName: path.basename(filePath).replace(/\.stories\.[^.]+$/, ''),
  }))
}

describe('Storybook snapshots', () => {
  getAllStoryFiles().forEach(({ storyFile, componentName }) => {
    const stories = Object.entries(composeStories(storyFile))

    describe(componentName, () => {
      stories.forEach(([name, story]) => {
        test(name, async () => {
          await story.run()
          expect(document.body.firstChild).toMatchSnapshot()
        })
      })
    })
  })
})
