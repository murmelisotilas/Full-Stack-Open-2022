import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> right prop details when a new blog is created', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('Title')
    const inputAuthor = screen.getByPlaceholderText('Author')
    const inputUrl = screen.getByPlaceholderText('Url')
    const sendButton = screen.getByText('save')

    await user.type(inputTitle, 'testTitle')
    await user.type(inputAuthor, 'testAuthor')
    await user.type(inputUrl, 'testUrl')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toBe('testTitle')
    expect(createBlog.mock.calls[0][1]).toBe('testAuthor')
    expect(createBlog.mock.calls[0][2]).toBe('testUrl')
})
