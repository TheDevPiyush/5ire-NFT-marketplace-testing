// CollectionForm.jsx
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CollectionCard({
    collectionName,
    setCollectionName,
    file,
    setFile,
    onSubmit,
}) {
    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ collectionName, file })
    }

    const handleCancel = () => {
        setCollectionName("")
        setFile(null)
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Create New Collection</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col gap-3 space-y-1.5">
                            <Label htmlFor="collectionName">Collection Name</Label>
                            <div className="flex ">
                                <Input
                                    className='p-3 py-5'
                                    id="collectionName"
                                    placeholder="Enter collection name"
                                    value={collectionName}
                                    onChange={(e) => setCollectionName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1.5 gap-2">
                            <Label htmlFor="fileUpload">Upload File</Label>
                            <Input
                                type="file"
                                multiple
                                id="fileUpload"
                                onChange={(e) => setFile(Array.from(e.target.files))}
                                accept=".jpg,.jpeg,.png,.pdf"
                                required
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} type="submit">
                    Submit
                </Button>
            </CardFooter>
        </Card>
    )
}
