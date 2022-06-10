import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'


describe('<Blog /> rendering by default', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Mikael',
        url: 'https://react-testing-library.com/docs/api',
        likes: 1,
        /* user: {
            name: 'Mikael',
            username: 'mikael',
        } */
    }
    test('renders content', () => {

        render(<Blog blog={blog} />)

        const title = screen.getByText('Component testing is done with react-testing-library')
        expect(title).toBeDefined()
    })
    test('renders author', () => {

        render(<Blog blog={blog} />)

        const author = screen.getByText('Mikael')
        expect(author).toBeDefined()
    })
    test('doesnt render url', () => {

        render(<Blog blog={blog} />)

        const url = screen.queryByText('https://react-testing-library.com/docs/api')
        expect(url).toBeNull()
    })
    test('doesnt render likes', () => {

        render(<Blog blog={blog} />)

        const likes = screen.queryByText('1 likes')
        expect(likes).toBeNull()
    })
})

describe('<Blog /> after clicking the button show', () => {

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Mikael',
        url: 'https://react-testing-library.com/docs/api',
        likes: 1,
        user: {
            name: 'Mikael',
            username: 'mikael',
        }
    }

    let content

    beforeEach(() => {
        content = render(
            <Blog blog={blog} />
        )
    })

    test('renders title, author, url and likes', () => {

        const button = content.container.querySelector('button')
        fireEvent.click(button)

        const title = content.container.querySelector('.testTitle')
        expect(title).toBeInTheDocument()

        const author = content.container.querySelector('.testAuthor')
        expect(author).toBeInTheDocument()

        const url = content.container.querySelector('.testUrl')
        expect(url).toBeInTheDocument()

        const likes = content.container.querySelector('.testLikes')
        expect(likes).toBeInTheDocument()
    })
})

describe('<Blog /> after clickint the button', () => {

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Mikael',
        url: 'https://react-testing-library.com/docs/api',
        likes: 1,
        user: {
            name: 'Mikael',
            username: 'mikael',
        }
    }

    let content

    const likeMockHandler = jest.fn()

    beforeEach(() => {
        content = render(
            <Blog blog={blog} updateBlog={likeMockHandler}/>
        )
    }
    )

    test('clicks the button twice', () => {

        const button = content.container.querySelector('button')
        fireEvent.click(button)

        const newLike = content.getByText('like')
        fireEvent.click(newLike)
        fireEvent.click(newLike)

        expect(likeMockHandler.mock.calls).toHaveLength(2)
    })
})
